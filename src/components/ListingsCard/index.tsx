import { FC } from "react";

import {
  Card,
  CardActions,
  CardProps,
  Divider,
  List,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

import { defaultsDeep } from "lodash";

import EmptyIcon from "assets/icons/empty.svg";
import ListingsItem, { ListingsItemProps } from "components/ListingsItem";
import useQueryListings from "graphql/useQueryListings";
import useDefaultBounds from "hooks/useDefaultBounds";
import useRouterState from "hooks/useRouterState";

export type ListingsCardProps = {
  CardProps?: CardProps;
  ListingsItemProps?: (
    listingId: SingleListing["listingId"]
  ) => ListingsItemProps;
};

const ListingsCard: FC<ListingsCardProps> = ({
  CardProps,
  ListingsItemProps,
}) => {
  const { routerState, setRouterState } = useRouterState<{
    queryListingsArgs: QueriesQueryListingsArgs;
  }>();

  const [defaultBounds] = useDefaultBounds();
  const { data, isLoading, isFetching } = useQueryListings(
    {
      ...routerState.queryListingsArgs,
      bounds: defaultsDeep(
        routerState.queryListingsArgs?.bounds,
        defaultBounds
      ),
    },
    {
      keepPreviousData: true,
    }
  );

  return (
    <Card
      square
      {...CardProps}
      sx={{
        boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.15)",
        ...CardProps?.sx,
      }}
    >
      <Stack
        sx={{
          height: "100%",
        }}
      >
        <Stack
          sx={{
            flex: 1,
            overflow: "auto",
          }}
        >
          {data?.queryListings?.listings?.length === 0 ? (
            <Stack alignItems="center">
              <EmptyIcon />
              <Typography
                variant="body2"
                sx={{
                  color: "#999",
                }}
              >
                There is nothing for you to search, please re-enter your address
              </Typography>
            </Stack>
          ) : (
            <List disablePadding>
              {(isLoading
                ? Array.from(new Array(100))
                : data?.queryListings?.listings
              )?.map((listing, index) => {
                const itemProps = ListingsItemProps?.(listing?.listingId);
                return (
                  <ListingsItem
                    key={listing?.listingId ?? index}
                    {...itemProps}
                    ListItemProps={{
                      divider: true,
                      ...itemProps?.ListItemProps,
                    }}
                    ListItemButtonProps={{
                      disabled: isFetching,
                      ...itemProps?.ListItemButtonProps,
                      sx: {
                        px: 2,
                        py: 1.5,
                        ...itemProps?.ListItemButtonProps?.sx,
                      },
                    }}
                    listing={listing}
                  />
                );
              })}
            </List>
          )}
        </Stack>
        {!!data?.queryListings && (
          <>
            <Divider />
            <CardActions
              sx={{
                justifyContent: "center",
              }}
            >
              <Pagination
                count={data.queryListings.totalPage}
                page={data.queryListings.currentPage}
                shape="rounded"
                color="primary"
                onChange={(event, page) => {
                  setRouterState({
                    queryListingsArgs: {
                      currentPage: page,
                    },
                  });
                }}
              />
            </CardActions>
          </>
        )}
      </Stack>
    </Card>
  );
};

export default ListingsCard;
