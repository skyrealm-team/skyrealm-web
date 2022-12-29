import { FC } from "react";

import {
  GoogleMap,
  GoogleMapProps,
  LoadScriptNext,
  MarkerProps,
} from "@react-google-maps/api";

import Loading from "components/Loading";

import Makers from "./Makers";

export type PropertyMapProps = GoogleMapProps & {
  listing?: Maybe<SingleListing>;
  MarkerProps?: MarkerProps;
};
const PropertyMap: FC<PropertyMapProps> = ({
  listing,
  MarkerProps,
  center,
  ...props
}) => {
  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
      loadingElement={<Loading />}
    >
      <GoogleMap
        {...props}
        mapContainerStyle={{
          aspectRatio: 1667 / 410,
          ...props.mapContainerStyle,
        }}
        center={center}
        onLoad={(map) => {
          if (listing?.polyGeom) {
            map.data.setStyle({
              strokeColor: "#FF6633",
              fillColor: "#FF6633",
            });
            map.data.addGeoJson({
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: listing?.polyGeom,
                },
              ],
            });
          }
        }}
        options={{
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
          clickableIcons: false,
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
        {MarkerProps && <Makers {...MarkerProps} />}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default PropertyMap;
