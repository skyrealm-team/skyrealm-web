import { FC } from "react";

import {
  GoogleMap,
  GoogleMapProps,
  LoadScriptNext,
  MarkerProps,
} from "@react-google-maps/api";

import Loading from "components/Loading";

import CircleMarker from "./CircleMarker";

export type PropertyMapProps = GoogleMapProps & {
  MarkerProps?: MarkerProps;
};
const PropertyMap: FC<PropertyMapProps> = ({ MarkerProps, ...props }) => {
  if (!MarkerProps?.position) {
    return null;
  }

  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
      loadingElement={<Loading />}
    >
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
        <CircleMarker {...MarkerProps} />
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default PropertyMap;
