import { FC, useRef } from 'react';
import { Avatar, IconButton, Typography, Stack } from '@mui/material';
import { useHoverDirty, useUpdateEffect } from 'react-use';
import { ReactComponent as ListingIcon } from 'assets/icons/listing.svg';
import { ReactComponent as FavoriteIcon } from 'assets/icons/favorite.svg';
import { ReactComponent as FavoriteSelectedIcon } from 'assets/icons/favorite-selected.svg';
import useUpdateFavoriteListings from 'graphql/useUpdateFavoriteListings';
import useUserInfo from 'graphql/useUserInfo';

const formatter = Intl.NumberFormat('en', { notation: 'compact' });

export type ListingsItemProps = {
  listing?: SingleListing;
  onHoverChange?: (hovered: boolean) => void;
};

const ListingsItem: FC<ListingsItemProps> = ({ listing, onHoverChange }) => {
  const { data: userInfo, refetch: refetchUserInfo } = useUserInfo();
  const { mutateAsync: updateFavoriteListings, isLoading: updateFavoriteListingsIsLoading } =
    useUpdateFavoriteListings();

  const isFavorite = userInfo?.getUserUserInfo.favorite?.includes(listing?.listingId);
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useHoverDirty(ref);

  useUpdateEffect(() => {
    onHoverChange?.(isHovered);
  }, [isHovered]);

  return (
    <Stack
      ref={ref}
      direction="row"
      gap={2}
      justifyContent="space-between"
      sx={{
        flex: 1,
        overflow: 'hidden',
      }}
    >
      <Stack
        direction="row"
        gap={2}
        sx={{
          overflow: 'hidden',
        }}
      >
        <Avatar
          variant="rounded"
          sx={{
            width: 'auto',
            height: 'auto',
            p: 2,
            background: '#F0F0F0',
          }}
        >
          <ListingIcon />
        </Avatar>
        <Stack
          gap={2}
          sx={{
            overflow: 'hidden',
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
            }}
            noWrap
          >
            {listing?.address}
          </Typography>
          <Stack direction="row" gap={4}>
            {[
              {
                key: 'Visitors',
                value: listing?.visitors,
              },
              {
                key: 'Frequency',
                value: listing?.frequency,
              },
              {
                key: 'Medium income',
                value: listing?.mediumIncome,
              },
            ].map(({ key, value }) => (
              <Stack key={key}>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {formatter.format(value ?? 0)}
                </Typography>
                <Typography
                  variant="subtitle2"
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
            } catch {
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
