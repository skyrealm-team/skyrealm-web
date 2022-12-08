import { FC, useRef } from "react";
import { useToggle } from "react-use";

import {
  InfoWindowF,
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
  const ref = useRef<Marker>(null);
  const [hovering, setHovering] = useToggle(false);

  const focused = hovering || hovered || selected;

  return (
    <Marker
      ref={ref}
      icon={focused ? "/icons/pin-focused.svg" : "/icons/pin.svg"}
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
            minWidth: 485,
          }}
        >
          <ListingsItem listing={listing} />
        </InfoWindowF>
      )}
    </Marker>
  );
};

export default InfoMarker;
