import React, { FC, useMemo } from 'react';
import { GoogleMap, GoogleMapProps } from '@react-google-maps/api';
import Markers, { MarkersProps } from './Markers';

export type ListingsMapProps = {
  listings?: Maybe<SingleListing>[];
  GoogleMapProps?: GoogleMapProps;
  MarkersProps?: MarkersProps;
};
const ListingsMap: FC<ListingsMapProps> = ({ listings, GoogleMapProps, MarkersProps }) => {
  const center = useMemo(
    () => ({
      lat: Number(listings?.[0]?.latitude ?? 40.776676),
      lng: Number(listings?.[0]?.longitude ?? -73.971321) - 1,
    }),
    [listings],
  );

  return (
    <GoogleMap
      center={center}
      zoom={10}
      clickableIcons={false}
      {...GoogleMapProps}
      options={{
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
