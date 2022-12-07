import React, { FC, useRef } from 'react';
import { InfoWindowF, InfoWindowProps, Marker, MarkerProps } from '@react-google-maps/api';
import ListingsItem from 'components/ListingsItem';
import pinLarge from 'assets/icons/pin-large.svg';
import pinFocused from 'assets/icons/pin-focused.svg';
import { useToggle } from 'react-use';

export type InfoMarkerProps = Omit<MarkerProps, 'position'> &
  Partial<Pick<MarkerProps, 'position'>> & {
    listing?: SingleListing;
    hovered?: boolean;
    selected?: boolean;
    InfoWindowProps?: InfoWindowProps;
  };
const InfoMarker: FC<InfoMarkerProps> = ({ listing, hovered, selected, InfoWindowProps, ...props }) => {
  const ref = useRef<Marker>(null);
  const [hovering, setHovering] = useToggle(false);

  const focused = hovering || hovered || selected;

  return (
    <Marker
      ref={ref}
      icon={focused ? pinFocused : pinLarge}
      {...(focused && {
        zIndex: Number.MAX_SAFE_INTEGER,
      })}
      {...props}
      position={{
        lat: Number(listing?.latitude),
        lng: Number(listing?.longitude),
        ...props.position,
      }}
      onMouseOver={(event) => {
        setHovering(true);
        props.onMouseOver?.(event);
      }}
      onMouseOut={(event) => {
        setHovering(false);
        props.onMouseOut?.(event);
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
