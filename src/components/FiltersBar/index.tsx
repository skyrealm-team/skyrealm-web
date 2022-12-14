import { FC } from "react";
import { useUpdateEffect } from "react-use";

import { AppBar, MenuItem, Stack, Toolbar } from "@mui/material";

import PlaceField from "components/PlaceField";
import SelectField from "components/SelectField";
import usePlaceDetails from "hooks/usePlaceDetails";
import useRouterState from "hooks/useRouterState";

export type Filters = {
  address?: string;
  placeId?: string;
  for?: "lease" | "sale";
  spaceUse?: string;
};

const FiltersBar: FC = () => {
  const { routerState, setRouterState } = useRouterState<{
    queryListingsArgs: QueriesQueryListingsArgs;
    filters: Filters;
  }>({
    filters: {
      for: "lease",
      spaceUse: "",
    },
  });

  const { data: placeDetails } = usePlaceDetails({
    placeId: routerState.filters?.placeId ?? "",
  });

  useUpdateEffect(() => {
    setRouterState({
      filters: {
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
                  for: event.target.value as Filters["for"],
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
            value={routerState.filters?.spaceUse}
            onChange={(event) => {
              setRouterState({
                filters: {
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
