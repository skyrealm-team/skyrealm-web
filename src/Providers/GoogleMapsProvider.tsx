import { FC, PropsWithChildren, useCallback } from 'react';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { CircularProgress } from '@mui/material';

const GoogleMapsProvider: FC<PropsWithChildren> = ({ children }) => {
  const onRender = useCallback((status: Status) => {
    if (status === Status.LOADING) {
      return <CircularProgress />;
    }

    return <></>;
  }, []);

  return (
    <Wrapper render={onRender} apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? ''}>
      {children}
    </Wrapper>
  );
};

export default GoogleMapsProvider;
