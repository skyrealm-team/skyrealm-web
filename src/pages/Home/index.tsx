import React, { FC, useMemo, useState } from 'react';
import { Stack } from '@mui/material';
import { usePrevious, useSetState } from 'react-use';
import ListingsCard from 'components/ListingsCard';
import FiltersBar from 'components/FiltersBar';
import useQueryListings from 'graphql/useQueryListings';
import ListingsMap from 'components/ListingsMap';

const Home: FC = () => {
  const [variables, setVariables] = useSetState<QueriesQueryListingsArgs>({
    // freeText: 'Manhattan, New York, NY',
    freeText: 'NY',
    currentPage: 1,
    listingId: undefined,
    addressState: undefined,
  });
  const { data, isLoading } = useQueryListings(variables);
  const previousQueryListings = usePrevious(data?.queryListings);
  const queryListings = useMemo(
    () => data?.queryListings ?? previousQueryListings,
    [data?.queryListings, previousQueryListings],
  );
  const [hovering, setHovering] = useState<SingleListing['listingId']>();

  return (
    <Stack
      sx={{
        flex: 1,
      }}
    >
      <FiltersBar
        initialValues={{
          address: variables.freeText ?? '',
        }}
        onChange={(values) => {
          setVariables({
            freeText: values.address,
            currentPage: 1,
          });
        }}
      />
      <Stack
        direction="row"
        sx={{
          flex: 1,
          position: 'relative',
        }}
      >
        <ListingsCard
          loading={isLoading}
          queryListing={queryListings}
          onHoverChange={setHovering}
          onPageChange={(currentPage) => {
            setVariables({
              currentPage,
            });
          }}
          CardProps={{
            sx: {
              zIndex: 1,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            },
          }}
        />
        <ListingsMap
          listings={queryListings?.listings}
          GoogleMapProps={{
            mapContainerStyle: {
              flex: 1,
            },
          }}
          MarkersProps={{
            selection: hovering,
            MarkerProps: {
              clickable: !isLoading,
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Home;
