import React, { FC, PropsWithChildren } from 'react';
import { LoadScript } from '@react-google-maps/api';
import Loading from 'components/Loading';

const GoogleMapsProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? ''}
      libraries={['places']}
      loadingElement={<Loading />}
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapsProvider;
