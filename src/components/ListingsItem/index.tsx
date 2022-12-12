import { FC, useRef } from "react";

import {
  Avatar,
  BoxProps,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import FavoriteSelectedIcon from "assets/icons/favorite-selected.svg";
import FavoriteIcon from "assets/icons/favorite.svg";
import ListingIcon from "assets/icons/listing.svg";
import useUpdateFavoriteListings from "graphql/useUpdateFavoriteListings";
import useUserInfo from "graphql/useUserInfo";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

export type ListingsItemProps = BoxProps & {
  listing?: SingleListing;
};

const ListingsItem: FC<ListingsItemProps> = ({ listing, ...props }) => {
  const { data: userInfo, refetch: refetchUserInfo } = useUserInfo();
  const {
    mutateAsync: updateFavoriteListings,
    isLoading: updateFavoriteListingsIsLoading,
  } = useUpdateFavoriteListings();

  const isFavorite = userInfo?.getUserUserInfo.favorite?.includes(
    listing?.listingId
  );
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Stack
      ref={ref}
      direction="row"
      gap={2}
      alignItems="center"
      justifyContent="space-between"
      {...props}
      sx={{
        flex: 1,
        overflow: "hidden",
        ...props.sx,
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
            borderRadius: "10px",
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
                value: listing?.visitors,
              },
              {
                key: "Frequency",
                value: listing?.frequency,
              },
              {
                key: "Medium income",
                value: listing?.mediumIncome,
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
                    {formatter.format(value ?? 0)}
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
            event.stopPropagation();
            try {
              await updateFavoriteListings({
                listingId: listing?.listingId,
                toLike: !isFavorite,
              });
            } finally {
              refetchUserInfo();
            }
          }}
          disableFocusRipple
          disabled={updateFavoriteListingsIsLoading}
          sx={{
            p: 0,
          }}
        >
          {isFavorite ? <FavoriteSelectedIcon /> : <FavoriteIcon />}
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ListingsItem;
