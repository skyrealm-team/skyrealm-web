import { FC } from "react";

import { GoogleMap, GoogleMapProps } from "@react-google-maps/api";

export type PropertyMapProps = GoogleMapProps;
const PropertyMap: FC<PropertyMapProps> = ({ ...props }) => {
  return (
    <GoogleMap
      center={{ lat: 40.7830603, lng: -73.9712488 }}
      zoom={12}
      {...props}
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
    />
  );
};

export default PropertyMap;
