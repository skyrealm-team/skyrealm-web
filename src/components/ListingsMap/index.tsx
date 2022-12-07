import { ClassAttributes, FC } from 'react';

import { GoogleMap, GoogleMapProps } from '@react-google-maps/api';

import Markers, { MarkersProps } from './Markers';

export type ListingsMapProps = {
  listings?: Maybe<SingleListing>[];
  GoogleMapProps?: GoogleMapProps & ClassAttributes<GoogleMap>;
  MarkersProps?: MarkersProps;
};
const ListingsMap: FC<ListingsMapProps> = ({ listings, GoogleMapProps, MarkersProps }) => {
  return (
    <GoogleMap
      zoom={5}
      clickableIcons={false}
      {...GoogleMapProps}
      options={{
        mapId: process.env.REACT_APP_GOOGLE_MAPS_ID,
        controlSize: 30,
        disableDefaultUI: false,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        ...GoogleMapProps?.options,
      }}
    >
      <Markers {...MarkersProps} listings={listings} />
    </GoogleMap>
  );
};

export default ListingsMap;
