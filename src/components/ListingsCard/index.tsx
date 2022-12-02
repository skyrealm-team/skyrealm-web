import { FC, useState } from 'react';
import {
  Card,
  List,
  Stack,
  CardActions,
  Pagination,
  ListItemButton,
  ListItem,
  CardProps,
  LinearProgress,
} from '@mui/material';
import ListingsItem from 'components/ListingsItem';
import { useUpdateEffect } from 'react-use';

export type ListingsCardProps = {
  loading?: boolean;
  queryListing?: QueryListing;
  onPageChange?: (page: number) => void;
  onHoverChange?: (hovering?: SingleListing['listingId']) => void;
  CardProps?: CardProps;
};

const ListingsCard: FC<ListingsCardProps> = ({ loading, queryListing, onPageChange, onHoverChange, CardProps }) => {
  const [hovering, setHovering] = useState<SingleListing['listingId']>();

  useUpdateEffect(() => {
    onHoverChange?.(hovering);
  }, [hovering]);

  return (
    <Card
      square
      {...CardProps}
      sx={{
        width: 620,
        boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.15)',
        ...CardProps?.sx,
      }}
    >
      <Stack
        sx={{
          height: '100%',
        }}
      >
        {loading && <LinearProgress />}
        <List
          disablePadding
          sx={{
            flex: 1,
            overflow: 'auto',
          }}
        >
          {queryListing?.listings?.map((listing) => (
            <ListItem key={listing?.listingId} divider disablePadding>
              <ListItemButton
                onClick={() => {}}
                disableRipple
                sx={{
                  px: 3,
                  py: 2,
                  justifyContent: 'space-between',
                }}
                disabled={loading}
              >
                <Stack
                  direction="row"
                  gap={2}
                  sx={{
                    flex: 1,
                    overflow: 'hidden',
                  }}
                >
                  <ListingsItem
                    listing={listing}
                    onHoverChange={(hovered) => {
                      if (hovered) {
                        setHovering(listing?.listingId);
                      } else if (hovering === listing?.listingId) {
                        setHovering(undefined);
                      }
                    }}
                  />
                </Stack>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {!!queryListing?.pageNumbers && (
          <CardActions
            sx={{
              p: 2,
              justifyContent: 'center',
            }}
          >
            <Pagination
              shape="rounded"
              color="primary"
              count={queryListing?.pageNumbers}
              page={queryListing?.currentPage ?? 1}
              onChange={(event, page) => {
                onPageChange?.(page);
              }}
              disabled={loading}
            />
          </CardActions>
        )}
      </Stack>
    </Card>
  );
};

export default ListingsCard;
