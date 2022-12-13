import { FC, useState } from "react";
import { useDeepCompareEffect, useUpdateEffect } from "react-use";

import { useRouter } from "next/router";

import { AppBar, MenuItem, Stack, Toolbar } from "@mui/material";

import { useFormik } from "formik";

import PlaceField from "components/PlaceField";
import SelectField from "components/SelectField";
import usePlaceDetails from "hooks/usePlaceDetails";

type Filters = {
  address?: string;
  for?: "lease" | "sale";
  spaceUse?: string;
};

export type FiltersBarProps = {
  onSubmit?: (values: Filters) => void;
};
const FiltersBar: FC<FiltersBarProps> = ({ onSubmit }) => {
  const router = useRouter();
  const queryListingArgs: QueriesQueryListingsArgs = JSON.parse(
    String(router.query.listingsArgs ?? "{}")
  );
  const filters: Filters = JSON.parse(String(router.query.filters ?? "{}"));
  const initialValues: Filters = {
    address: "",
    for: "lease",
    spaceUse: "",
    ...filters,
  };
  const formik = useFormik<Filters>({
    initialValues,
    onSubmit: (values) => {
      onSubmit?.(values);
    },
  });

  const [placeId, setPlaceId] = useState("");
  const { data: placeDetails } = usePlaceDetails({
    placeId,
  });

  useDeepCompareEffect(() => {
    formik.setValues(initialValues);
  }, [filters]);

  useUpdateEffect(() => {
    formik.setFieldValue("spaceUse", "");
  }, [formik.values.for]);

  useUpdateEffect(() => {
    if (formik.dirty) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          filters: JSON.stringify(formik.values),
        },
      });
    }
  }, [formik.values]);

  useUpdateEffect(() => {
    if (placeDetails?.geometry?.viewport) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          listingsArgs: JSON.stringify({
            ...queryListingArgs,
            bounds: placeDetails?.geometry?.viewport.toJSON(),
            currentPage: 1,
          }),
        },
      });
    }
  }, [placeDetails]);

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={(theme) => ({
        background: "rgba(255, 255, 255, 0.8)",
        boxShadow: "0px 5px 7px rgba(0, 0, 0, 0.05)",
        backdropFilter: "blur(3px)",
        zIndex: theme.zIndex.appBar - 1,
      })}
    >
      <Toolbar
        sx={{
          py: 0.8,
        }}
        style={{
          minHeight: "initial",
        }}
      >
        <Stack direction="row" gap={2}>
          <PlaceField
            value={formik.values.address}
            onChange={formik.handleChange("address")}
            onPredictionChange={async (prediction) => {
              await formik.setFieldValue(
                "address",
                prediction?.structured_formatting.main_text
              );

              setPlaceId(prediction?.place_id ?? "");
            }}
          />
          <SelectField
            value={formik.values.for}
            onChange={formik.handleChange("for")}
            size="small"
            sx={{
              minWidth: 142,
            }}
          >
            {[
              {
                key: "For Lease",
                value: "lease",
              },
              {
                key: "For Sale",
                value: "sale",
              },
            ].map(({ key, value }) => (
              <MenuItem key={key} value={value}>
                {key}
              </MenuItem>
            ))}
          </SelectField>
          <SelectField
            value={formik.values.spaceUse}
            onChange={formik.handleChange("spaceUse")}
            size="small"
            sx={{
              minWidth: 142,
            }}
          >
            <MenuItem
              value=""
              sx={(theme) => ({
                color: theme.palette.text.disabled,
              })}
            >
              Space Use
            </MenuItem>
            {(formik.values.for === "lease"
              ? [
                  {
                    key: "Retail",
                    value: "retail",
                  },
                  {
                    key: "Restaurant",
                    value: "restaurant",
                  },
                  {
                    key: "Flex",
                    value: "flex",
                  },
                  {
                    key: "Office",
                    value: "office",
                  },
                  {
                    key: "Medical",
                    value: "medical",
                  },
                ]
              : [
                  {
                    key: "Retail",
                    value: "retail",
                  },
                  {
                    key: "Restaurant",
                    value: "restaurant",
                  },
                  {
                    key: "Office",
                    value: "office",
                  },
                  {
                    key: "Medical",
                    value: "medical",
                  },
                  {
                    key: "Shopping Center",
                    value: "shopping-center",
                  },
                  {
                    key: "Multifamily",
                    value: "multifamily",
                  },
                  {
                    key: "Hospitality",
                    value: "hospitality",
                  },
                ]
            ).map(({ key, value }) => (
              <MenuItem key={key} value={value}>
                {key}
              </MenuItem>
            ))}
          </SelectField>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default FiltersBar;
