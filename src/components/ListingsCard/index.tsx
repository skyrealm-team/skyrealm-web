import { FC } from 'react';
import {
  Card,
  List,
  Stack,
  CardActions,
  Pagination,
  ListItemButton,
  ListItem,
  CardProps,
  Divider,
  Typography,
} from '@mui/material';
import ListingsItem, { ListingsItemProps } from 'components/ListingsItem';
import { ReactComponent as EmptyIcon } from 'assets/icons/empty.svg';

export type ListingsCardProps = {
  isLoading?: boolean;
  queryListing?: QueryListing;
  onPageChange?: (page: number) => void;
  CardProps?: CardProps;
  ListingsItemProps?: (listingId: SingleListing['listingId']) => ListingsItemProps;
};

const ListingsCard: FC<ListingsCardProps> = ({
  isLoading,
  queryListing,
  onPageChange,
  CardProps,
  ListingsItemProps,
}) => {
  return (
    <Card
      square
      {...CardProps}
      sx={{
        boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.15)',
        ...CardProps?.sx,
      }}
    >
      {queryListing?.listings?.length === 0 ? (
        <Stack alignItems="center">
          <EmptyIcon />
          <Typography
            variant="body2"
            sx={{
              color: '#999',
            }}
          >
            There is nothing for you to search, please re-enter your address
          </Typography>
        </Stack>
      ) : (
        <Stack
          sx={{
            height: '100%',
          }}
        >
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
                    py: 1.5,
                    justifyContent: 'space-between',
                  }}
                  disabled={isLoading}
                >
                  <Stack
                    direction="row"
                    gap={2}
                    sx={{
                      flex: 1,
                      overflow: 'hidden',
                    }}
                  >
                    <ListingsItem {...ListingsItemProps?.(listing?.listingId)} listing={listing} />
                  </Stack>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {!!queryListing?.pageNumbers && (
            <>
              <Divider />
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
                  disabled={isLoading}
                />
              </CardActions>
            </>
          )}
        </Stack>
      )}
    </Card>
  );
};

export default ListingsCard;
