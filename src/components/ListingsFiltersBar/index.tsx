import { FC } from "react";
import { useUpdateEffect } from "react-use";

import { AppBar, MenuItem, Stack, Toolbar } from "@mui/material";

import PlaceField from "components/PlaceField";
import SelectField from "components/SelectField";
import usePlaceDetails from "hooks/usePlaceDetails";
import useRouterState from "hooks/useRouterState";

export type ListingsFilters = {
  address?: string;
  placeId?: string;
  for?: "lease" | "sale";
};

const ListingsFiltersBar: FC = () => {
  const { routerState, setRouterState } = useRouterState<{
    queryListingsArgs: QueriesQueryListingsArgs;
    filters: ListingsFilters;
  }>({
    filters: {
      for: "lease",
    },
  });

  const { data: placeDetails } = usePlaceDetails({
    placeId: routerState.filters?.placeId ?? "",
  });

  useUpdateEffect(() => {
    setRouterState({
      queryListingsArgs: {
        spaceUse: "",
      },
    });
  }, [routerState.filters?.for]);

  useUpdateEffect(() => {
    if (placeDetails?.geometry?.viewport) {
      setRouterState({
        queryListingsArgs: {
          bounds: placeDetails?.geometry?.viewport.toJSON(),
          currentPage: 1,
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
            value={routerState.filters?.address}
            onChange={(_, prediction) => {
              setRouterState({
                filters: {
                  address: prediction?.structured_formatting.main_text,
                  placeId: prediction?.place_id,
                },
              });
            }}
          />
          <SelectField
            value={routerState.filters?.for}
            onChange={(event) => {
              setRouterState({
                filters: {
                  for: event.target.value as ListingsFilters["for"],
                },
              });
            }}
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
            value={routerState.queryListingsArgs?.spaceUse ?? ""}
            onChange={(event) => {
              setRouterState({
                queryListingsArgs: {
                  spaceUse: event.target.value,
                },
              });
            }}
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
            {(routerState.filters?.for === "lease"
              ? [
                  {
                    key: "Retail",
                    value: "Retail",
                  },
                  {
                    key: "Restaurant",
                    value: "Restaurant",
                  },
                  {
                    key: "Flex",
                    value: "Flex",
                  },
                  {
                    key: "Office",
                    value: "Office",
                  },
                  {
                    key: "Medical",
                    value: "Medical",
                  },
                ]
              : [
                  {
                    key: "Retail",
                    value: "Retail",
                  },
                  {
                    key: "Restaurant",
                    value: "Restaurant",
                  },
                  {
                    key: "Office",
                    value: "Office",
                  },
                  {
                    key: "Medical",
                    value: "Medical",
                  },
                  {
                    key: "Shopping Center",
                    value: "Shopping Center",
                  },
                  {
                    key: "Multifamily",
                    value: "Multifamily",
                  },
                  {
                    key: "Hospitality",
                    value: "Hospitality",
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

export default ListingsFiltersBar;
