import { FC } from "react";

import Link from "next/link";

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

import EmptyIcon from "assets/icons/empty.svg";
import ListingsItem, { ListingsItemProps } from "components/ListingsItem";

export type ListingsCardProps = {
  isLoading?: boolean;
  queryListing?: QueryListing;
  onPageChange?: (page: number) => void;
  CardProps?: CardProps;
  ListingsItemProps?: (
    listingId: SingleListing["listingId"]
  ) => ListingsItemProps;
};

const ListingsCard: FC<ListingsCardProps> = ({
  isLoading,
  queryListing,
  onPageChange,
  CardProps,
  ListingsItemProps,
}) => {
  const currentPage = queryListing?.currentPage ?? 1;

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
          {queryListing?.listings?.length === 0 ? (
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
              {queryListing?.listings?.map((listing) => (
                <ListItem key={listing?.listingId} divider disablePadding>
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
                      disabled={isLoading}
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
        {!!queryListing && (
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
                    onPageChange?.(currentPage - 1);
                  }}
                  disabled={currentPage === 1}
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
                    onPageChange?.(currentPage + 1);
                  }}
                  disabled={Number(queryListing.listings?.length) < 100}
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
