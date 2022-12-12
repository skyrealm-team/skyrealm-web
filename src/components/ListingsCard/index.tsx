import { FC } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardProps,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";

import { defaultBounds } from "consts";

import EmptyIcon from "assets/icons/empty.svg";
import ListingsItem, { ListingsItemProps } from "components/ListingsItem";
import useQueryListings from "graphql/useQueryListings";

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
  const router = useRouter();
  const queryListingArgs: QueriesQueryListingsArgs = JSON.parse(
    String(router.query.listingsArgs ?? "{}")
  );
  const { data, isLoading, isFetching } = useQueryListings(
    {
      ...queryListingArgs,
      bounds: queryListingArgs.bounds ?? defaultBounds,
    },
    {
      keepPreviousData: true,
    }
  );
  const currentPage = data?.queryListings?.currentPage ?? 1;

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
              )?.map((listing, index) => (
                <ListItem
                  key={listing?.listingId ?? index}
                  divider
                  disablePadding
                >
                  <Link
                    href={{
                      pathname: `/listing/${listing?.listingId}/property-info`,
                    }}
                    legacyBehavior
                  >
                    <ListItemButton
                      disableRipple
                      sx={{
                        px: 2,
                        py: 1.5,
                        justifyContent: "space-between",
                      }}
                      disabled={isLoading || isFetching}
                    >
                      <Stack
                        direction="row"
                        gap={2}
                        sx={{
                          flex: 1,
                          overflow: "hidden",
                        }}
                      >
                        <ListingsItem
                          {...ListingsItemProps?.(listing?.listingId)}
                          listing={listing}
                        />
                      </Stack>
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
          )}
        </Stack>
        {!!data?.queryListings && (
          <>
            <Divider />
            <CardActions>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                width="100%"
              >
                <IconButton
                  size="small"
                  onClick={() => {
                    router.query.listingsArgs = JSON.stringify({
                      ...queryListingArgs,
                      currentPage: currentPage - 1,
                    });
                    router.push(router);
                  }}
                  disabled={isFetching || currentPage === 1}
                >
                  <NavigateBefore />
                </IconButton>
                <Avatar
                  variant="rounded"
                  color="primary"
                  sx={{
                    width: 30,
                    height: 30,
                  }}
                >
                  <Typography variant="caption">{currentPage}</Typography>
                </Avatar>
                <IconButton
                  size="small"
                  onClick={() => {
                    router.query.listingsArgs = JSON.stringify({
                      ...queryListingArgs,
                      currentPage: currentPage + 1,
                    });
                    router.push(router);
                  }}
                  disabled={isFetching || !data?.queryListings?.hasNextPage}
                >
                  <NavigateNext />
                </IconButton>
              </Stack>
            </CardActions>
          </>
        )}
      </Stack>
    </Card>
  );
};

export default ListingsCard;
