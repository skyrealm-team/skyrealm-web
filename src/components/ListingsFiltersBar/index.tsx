import { FC } from "react";
import { useDeepCompareEffect } from "react-use";

import { AppBar, MenuItem, Stack, Toolbar } from "@mui/material";

import { isEmpty, isUndefined } from "lodash";

import PlaceField from "components/PlaceField";
import SelectField from "components/SelectField";
import useQueryListingFilters from "graphql/useQueryListingFilters";
import useRouterState from "hooks/useRouterState";

const ListingsFiltersBar: FC = () => {
  const { routerState, setRouterState } = useRouterState();

  const { data: listingFilters } = useQueryListingFilters();

  useDeepCompareEffect(() => {
    const options = listingFilters?.reduce((acc, cur) => {
      const value = routerState.queryListingsArgs?.[cur?.key as never];

      const matchedOption = cur?.options?.find((option) => {
        return (
          option?.value === value &&
          (!option?.match ||
            option.match.value ===
              routerState.queryListingsArgs?.[option?.match?.key as never])
        );
      });

      if (isUndefined(value) || !!matchedOption) {
        return acc;
      }

      return {
        ...acc,
        [cur?.key as never]: cur?.defaultValue?.value,
      };
    }, {});

    if (!Object.keys(options ?? {}).length) {
      return;
    }

    setRouterState({
      queryListingsArgs: options,
    });
  }, [
    listingFilters?.map(
      (listingFilter) =>
        routerState.queryListingsArgs?.[listingFilter?.key as never]
    ),
  ]);

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
            value={routerState.queryListingsArgs?.address}
            onChange={(_, prediction) => {
              setRouterState({
                queryListingsArgs: {
                  address: prediction?.structured_formatting.main_text,
                },
              });
            }}
            onResult={(result) => {
              const bounds = result?.geometry?.viewport?.toJSON();

              if (bounds) {
                setRouterState({
                  queryListingsArgs: {
                    bounds,
                    currentPage: 1,
                  },
                });
              }
            }}
          />
          {listingFilters?.map((listingFilter) => {
            return (
              <SelectField
                key={listingFilter?.key}
                value={
                  routerState.queryListingsArgs?.[
                    listingFilter?.key as never
                  ] ?? listingFilter?.defaultValue?.value
                }
                onChange={(event) => {
                  setRouterState({
                    queryListingsArgs: {
                      [listingFilter?.key as never]: event.target.value,
                    },
                  });
                }}
                size="small"
                sx={{
                  width: 142,
                }}
              >
                {listingFilter?.options
                  ?.filter((item): item is ListingFilterOption => !!item)
                  .filter(
                    ({ match }) =>
                      !match ||
                      routerState.queryListingsArgs?.[match.key as never] ===
                        match.value
                  )
                  .map(({ name, value }) => (
                    <MenuItem
                      key={name}
                      value={value ?? undefined}
                      sx={(theme) => ({
                        ...(isEmpty(value) && {
                          color: theme.palette.text.disabled,
                        }),
                      })}
                    >
                      {name}
                    </MenuItem>
                  ))}
              </SelectField>
            );
          })}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default ListingsFiltersBar;
