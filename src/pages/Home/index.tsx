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
  const { data, loading } = useQueryListings(variables);
  const previousQueryListings = usePrevious(data?.queryListings);
  const queryListings = useMemo(
    () => data?.queryListings ?? previousQueryListings,
    [data?.queryListings, previousQueryListings],
  );
  const [hovering, setHovering] = useState<SingleListing['listingId']>();

  return (
    <Stack
      sx={{
        position: 'relative',
        height: `calc(100vh - 90px)`,
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
        AppBarProps={{
          sx: {
            zIndex: 2,
          },
        }}
      />
      <Stack
        direction="row"
        sx={{
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <ListingsCard
          loading={loading}
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
              clickable: !loading,
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Home;
