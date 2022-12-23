import { FC } from "react";

import {
  GoogleMap,
  GoogleMapProps,
  Marker,
  MarkerProps,
} from "@react-google-maps/api";

export type PropertyMapProps = GoogleMapProps & {
  MarkerProps?: MarkerProps;
};
const PropertyMap: FC<PropertyMapProps> = ({ MarkerProps, ...props }) => {
  if (!MarkerProps?.position) {
    return null;
  }

  return (
    <GoogleMap
      zoom={12}
      {...props}
      center={MarkerProps?.position}
      options={{
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
        minZoom: 2,
        clickableIcons: false,
        controlSize: 30,
        disableDefaultUI: false,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        panControl: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        gestureHandling: "none",
        ...props.options,
      }}
    >
      <Marker
        icon={{
          url: "/icons/pin-circle.svg",
          anchor: new google.maps.Point(70, 70),
          scaledSize: new google.maps.Size(140, 140),
        }}
        {...MarkerProps}
        options={{
          optimized: true,
          ...MarkerProps?.options,
        }}
      />
    </GoogleMap>
  );
};

export default PropertyMap;
