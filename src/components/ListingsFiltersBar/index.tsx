import { FC } from "react";
import { useDeepCompareEffect } from "react-use";

import { AppBar, MenuItem, Stack, Toolbar } from "@mui/material";

import { isEmpty, isUndefined } from "lodash";

import PlaceField from "components/PlaceField";
import SelectField from "components/SelectField";
import useQueryListingFilters from "graphql/useQueryListingFilters";
import useQueryListingsArgs from "hooks/useQueryListingsArgs";

const ListingsFiltersBar: FC = () => {
  const { queryListingsArgs, setQueryListingsArgs } = useQueryListingsArgs();

  const { data: listingFilters } = useQueryListingFilters();

  useDeepCompareEffect(() => {
    const options = listingFilters?.reduce((acc, cur) => {
      const value = queryListingsArgs[cur?.key as never];

      const matchedOption = cur?.options?.find((option) => {
        return (
          option?.value === value &&
          (!option?.match ||
            option.match.value ===
              queryListingsArgs[option?.match?.key as never])
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

    if (!options || !Object.keys(options).length) {
      return;
    }

    setQueryListingsArgs(options);
  }, [
    listingFilters?.map(
      (listingFilter) => queryListingsArgs[listingFilter?.key as never]
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
        variant="dense"
        sx={{
          py: 0.8,
          overflow: "auto",
        }}
      >
        <Stack
          direction="row"
          gap={{
            xs: 1,
            sm: 2,
          }}
        >
          <PlaceField
            value={queryListingsArgs.address}
            onChange={(_, prediction) => {
              setQueryListingsArgs({
                address: prediction?.structured_formatting.main_text,
              });
            }}
            onResult={(result) => {
              const bounds = result?.geometry?.viewport?.toJSON();

              if (bounds) {
                setQueryListingsArgs({
                  bounds,
                  currentPage: 1,
                });
              }
            }}
          />
          {listingFilters?.map((listingFilter) => {
            return (
              <SelectField
                key={listingFilter?.key}
                value={
                  queryListingsArgs[listingFilter?.key as never] ??
                  listingFilter?.defaultValue?.value
                }
                onChange={(event) => {
                  setQueryListingsArgs({
                    [listingFilter?.key as never]: event.target.value,
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
                      queryListingsArgs[match.key as never] === match.value
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
