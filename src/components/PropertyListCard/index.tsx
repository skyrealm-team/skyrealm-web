import { FC, useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  IconButton,
  List,
  ListItemAvatar,
  Typography,
  Stack,
  CardActions,
  Pagination,
  ListItemButton,
  Checkbox,
  Divider,
  ListItem,
  Button,
  Paper,
} from '@mui/material';
import { ReactComponent as FavoriteIcon } from 'assets/icons/favorite.svg';

const formatter = Intl.NumberFormat('en', { notation: 'compact' });

export interface PropertyListCardProps {
  properties?: Property[];
}

const PropertyListCard: FC<PropertyListCardProps> = ({ properties }) => {
  const [selections, setSelections] = useState<string[]>([]);

  useEffect(() => {
    setSelections((selections) =>
      selections.filter((selection) => properties?.find((property) => property.id === selection)),
    );
  }, [properties]);

  return (
    <Card
      square
      sx={{
        zIndex: 1,
      }}
    >
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
          {properties?.map((property) => (
            <ListItem key={property.id} divider disablePadding>
              <ListItemButton
                onClick={() => {
                  setSelections((selections) =>
                    selections?.includes(property.id)
                      ? selections.filter((selection) => selection !== property.id)
                      : [...selections, property.id],
                  );
                }}
                selected={selections.includes(property.id)}
                disableRipple
                sx={{
                  width: 620,
                  px: 3,
                  py: 2,
                  justifyContent: 'space-between',
                }}
              >
                <Stack direction="row" gap={2}>
                  {selections?.includes(property.id) && (
                    <Checkbox
                      color="success"
                      checked
                      sx={{
                        p: 0,
                      }}
                    />
                  )}
                  <ListItemAvatar>
                    <Avatar
                      src={property.image}
                      variant="rounded"
                      sx={{
                        width: 110,
                        height: 110,
                      }}
                    />
                  </ListItemAvatar>
                  <Stack gap={2}>
                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: 700,
                      }}
                    >
                      {property.address}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" gap={4}>
                      {[
                        {
                          key: 'Visitors',
                          value: property.visitors,
                        },
                        {
                          key: 'Frequency',
                          value: property.frequency,
                        },
                        {
                          key: 'Medium income',
                          value: property.medium_income,
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
                            {formatter.format(value)}
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
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  sx={{
                    p: 0,
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
              </ListItemButton>
              {selections?.includes(property.id) && (
                <Paper
                  square={true}
                  elevation={0}
                  sx={(theme) => ({
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    px: 3,
                    background: theme.palette.border?.light,
                  })}
                >
                  <Stack
                    justifyContent="center"
                    sx={{
                      height: '100%',
                    }}
                  >
                    <Button variant="contained" color="primary">
                      Open Report
                    </Button>
                  </Stack>
                </Paper>
              )}
            </ListItem>
          ))}
        </List>
        {selections.length > 0 && (
          <>
            <CardActions
              sx={{
                px: 3,
                py: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                <Typography
                  component="span"
                  color="primary"
                  sx={{
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                  }}
                >
                  {selections.length}
                </Typography>{' '}
                Selected
              </Typography>
            </CardActions>
            <Divider />
          </>
        )}
        <CardActions
          sx={{
            p: 2,
            justifyContent: 'center',
          }}
        >
          <Pagination shape="rounded" color="primary" count={10} />
        </CardActions>
      </Stack>
    </Card>
  );
};

export default PropertyListCard;
