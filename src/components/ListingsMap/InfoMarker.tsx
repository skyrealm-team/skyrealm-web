import { FC, useState } from "react";
import { useToggle } from "react-use";

import {
  InfoWindow,
  InfoWindowProps,
  Marker,
  MarkerProps,
} from "@react-google-maps/api";

import ListingsItem from "components/ListingsItem";
import useGetUserInfo from "graphql/useGetUserInfo";

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
  const { data: userInfo } = useGetUserInfo();

  const [marker, setMarker] = useState<google.maps.Marker>();
  const [hovering, setHovering] = useToggle(false);

  const focused = hovering || hovered || selected;
  const favored = userInfo?.favorite?.includes(listing?.listingId);

  const size = Math.min(listing?.visitors, 10 * 1000) / 1000 + 10;

  return (
    <Marker
      icon={
        {
          url: favored
            ? "/icons/pin-favored.svg"
            : focused
            ? "/icons/pin-focused.svg"
            : "/icons/pin.png",
          scaledSize: {
            width: size,
            height: size,
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
