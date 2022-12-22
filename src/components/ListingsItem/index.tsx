import { FC } from "react";

import Link from "next/link";

import {
  Avatar,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  ListItemProps,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import FavoriteButtonSelectedIcon from "assets/icons/favorite-button-selected.svg";
import FavoriteButtonIcon from "assets/icons/favorite-button.svg";
import ListingIcon from "assets/icons/listing.svg";
import useGetUserInfo, { useSetUserInfoData } from "graphql/useGetUserInfo";
import useUpdateFavoriteListings from "graphql/useUpdateFavoriteListings";
import useOpens from "hooks/useOpens";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

export type ListingsItemProps = {
  listing?: SingleListing;
  ListItemProps?: ListItemProps;
  ListItemButtonProps?: ListItemButtonProps<"a">;
};

const ListingsItem: FC<ListingsItemProps> = ({
  listing,
  ListItemProps,
  ListItemButtonProps,
}) => {
  const [opens, setOpens] = useOpens();

  const {
    data: userInfo,
    refetch: refetchUserInfo,
    isFetching: userInfoIsFetching,
  } = useGetUserInfo();
  const setUserInfoData = useSetUserInfoData();
  const {
    mutateAsync: updateFavoriteListings,
    isLoading: updateFavoriteListingsIsLoading,
  } = useUpdateFavoriteListings();

  const isFavorite = userInfo?.favorite?.includes(listing?.listingId);

  return (
    <ListItem disablePadding {...ListItemProps}>
      <Link
        target="_blank"
        href={{
          pathname: `/listing/${listing?.listingId}/visits`,
        }}
        legacyBehavior
        passHref
      >
        <ListItemButton
          href=""
          target="_blank"
          disableRipple
          {...ListItemButtonProps}
          sx={{
            justifyContent: "space-between",
            ...ListItemButtonProps?.sx,
          }}
        >
          <Stack
            direction="row"
            gap={2}
            alignItems="center"
            justifyContent="space-between"
            sx={{
              flex: 1,
              overflow: "hidden",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              gap={1.5}
              sx={{
                overflow: "hidden",
              }}
            >
              <Avatar
                variant="rounded"
                sx={{
                  width: "auto",
                  height: "auto",
                  p: 1,
                  background: "#F0F0F0",
                }}
              >
                <ListingIcon />
              </Avatar>
              <Stack
                gap={0.5}
                sx={{
                  overflow: "hidden",
                }}
              >
                {listing ? (
                  <>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                      noWrap
                    >
                      {listing?.address}
                    </Typography>
                  </>
                ) : (
                  <Skeleton />
                )}
                <Stack direction="row" gap={3}>
                  {[
                    {
                      key: "Visitors",
                      value: formatter.format(listing?.visitors ?? 0),
                    },
                    {
                      key: "Frequency",
                      value: formatter.format(listing?.frequency ?? 0),
                    },
                    {
                      key: "Medium income",
                      value: listing?.mediumIncome ?? 0,
                    },
                  ].map(({ key, value }) => (
                    <Stack
                      key={key}
                      sx={{
                        overflow: "hidden",
                      }}
                    >
                      {listing ? (
                        <Typography
                          variant="subtitle1"
                          color="primary"
                          sx={{
                            fontSize: 16,
                            fontWeight: 700,
                          }}
                        >
                          {value}
                        </Typography>
                      ) : (
                        <Skeleton width="40%" />
                      )}
                      <Typography
                        variant="subtitle2"
                        noWrap
                        sx={(theme) => ({
                          color: theme.palette.text.disabled,
                          fontWeight: 400,
                        })}
                      >
                        {key}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Stack>
            <Stack justifyContent="center">
              <IconButton
                onClick={async (event) => {
                  event.preventDefault();

                  if (!userInfo) {
                    setOpens({
                      ...opens,
                      signinDialog: true,
                    });
                    return;
                  }

                  try {
                    if (userInfo) {
                      setUserInfoData({
                        ...userInfo,
                        favorite: !isFavorite
                          ? [...(userInfo?.favorite ?? []), listing?.listingId]
                          : userInfo?.favorite?.filter(
                              (item) => item !== listing?.listingId
                            ),
                      });
                    }
                    await updateFavoriteListings({
                      listingId: listing?.listingId,
                      toLike: !isFavorite,
                    });
                  } finally {
                    refetchUserInfo();
                  }
                }}
                disabled={updateFavoriteListingsIsLoading || userInfoIsFetching}
              >
                {isFavorite ? (
                  <FavoriteButtonSelectedIcon />
                ) : (
                  <FavoriteButtonIcon />
                )}
              </IconButton>
            </Stack>
          </Stack>
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default ListingsItem;
