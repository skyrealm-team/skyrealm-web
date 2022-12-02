import React, { FC, useRef } from 'react';
import { InfoWindowF, InfoWindowProps, Marker, MarkerProps } from '@react-google-maps/api';
import ListingsItem from 'components/ListingsItem';
import pin from 'assets/icons/pin.svg';
import pinSelected from 'assets/icons/pin-selected.svg';

export type InfoMarkerProps = Omit<MarkerProps, 'position'> &
  Partial<Pick<MarkerProps, 'position'>> & {
    listing?: SingleListing;
    selected?: boolean;
    InfoWindowProps?: InfoWindowProps;
  };
const InfoMarker: FC<InfoMarkerProps> = ({ listing, selected, InfoWindowProps, ...props }) => {
  const ref = useRef<Marker>(null);

  return (
    <Marker
      ref={ref}
      icon={selected ? pinSelected : pin}
      {...props}
      position={{
        lat: Number(listing?.latitude),
        lng: Number(listing?.longitude),
        ...props.position,
      }}
    >
      {ref.current?.marker && selected && (
        <InfoWindowF
          {...InfoWindowProps}
          anchor={ref.current?.marker}
          options={{
            minWidth: 560,
          }}
        >
          <ListingsItem listing={listing} />
        </InfoWindowF>
      )}
    </Marker>
  );
};

export default InfoMarker;
