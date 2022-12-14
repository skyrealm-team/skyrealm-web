import { FC, useState } from "react";
import { useToggle } from "react-use";

import {
  InfoWindow,
  InfoWindowProps,
  Marker,
  MarkerProps,
} from "@react-google-maps/api";

import ListingsItem from "components/ListingsItem";

export type InfoMarkerProps = Omit<MarkerProps, "position"> &
  Partial<Pick<MarkerProps, "position">> & {
    listing?: SingleListing;
    hovered?: boolean;
    selected?: boolean;
    InfoWindowProps?: InfoWindowProps;
  };
const InfoMarker: FC<InfoMarkerProps> = ({
  listing,
  hovered,
  selected,
  InfoWindowProps,
  ...props
}) => {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [hovering, setHovering] = useToggle(false);

  const focused = hovering || hovered || selected;

  return (
    <Marker
      icon={
        {
          url: focused ? "/icons/pin-focused.svg" : "/icons/pin.png",
          scaledSize: {
            width: 15,
            height: 15,
          },
        } as google.maps.Icon
      }
      {...(focused && {
        zIndex: Number.MAX_SAFE_INTEGER,
      })}
      {...props}
      options={{
        optimized: true,
        ...props.options,
      }}
      position={{
        lat: Number(listing?.latitude),
        lng: Number(listing?.longitude),
        ...props.position,
      }}
      onLoad={(marker) => {
        setMarker(marker);
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
      {marker && selected && (
        <InfoWindow
          {...InfoWindowProps}
          anchor={marker}
          options={{
            minWidth: 485,
            disableAutoPan: true,
          }}
        >
          <ListingsItem listing={listing} />
        </InfoWindow>
      )}
    </Marker>
  );
};

export default InfoMarker;
