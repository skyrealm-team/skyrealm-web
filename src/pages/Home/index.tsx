import React, { FC } from 'react';
import { Stack } from '@mui/material';
import { useGeolocation } from 'react-use';
import useProperties from 'graphql/useProperties';
import Map from 'components/Map';
import PropertyListCard from 'components/PropertyListCard';
import FilterBar from 'components/FilterBar';

const Home: FC = () => {
  const { data: properties } = useProperties();
  const geoLocation = useGeolocation();

  return (
    <Stack
      sx={{
        position: 'relative',
        height: `calc(100vh - 90px)`,
        alignItems: 'flex-start',
      }}
    >
      <Map
        options={{
          center: {
            lat: geoLocation.latitude ?? -33.91722,
            lng: geoLocation.longitude ?? 151.23064,
          },
          zoom: 14,
        }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></Map>
      <FilterBar />
      <PropertyListCard properties={properties} />
    </Stack>
  );
};

export default Home;
