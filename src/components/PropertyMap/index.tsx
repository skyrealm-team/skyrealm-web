import { FC } from "react";

import { Theme, useMediaQuery } from "@mui/material";

import {
  GoogleMap,
  GoogleMapProps,
  LoadScriptNext,
  MarkerProps,
} from "@react-google-maps/api";

import Makers from "./Makers";

export type PropertyMapProps = GoogleMapProps & {
  listing?: Maybe<SingleListing>;
  MarkerProps?: MarkerProps;
  polyGeom?: boolean;
};
const PropertyMap: FC<PropertyMapProps> = ({
  listing,
  MarkerProps,
  center,
  polyGeom,
  ...props
}) => {
  const upSM = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
    >
      <GoogleMap
        {...props}
        mapContainerStyle={{
          aspectRatio: `${3 / 2}`,
          ...(upSM && {
            aspectRatio: `${1667 / 410}`,
          }),
          ...props.mapContainerStyle,
        }}
        center={center}
        onLoad={(map) => {
          try {
            if (polyGeom && listing?.polyGeom) {
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

              const bounds = new google.maps.LatLngBounds();

              map.data.forEach((feature) => {
                feature.getGeometry()?.forEachLatLng((latlng) => {
                  bounds.extend(latlng);
                });
              });

              map.fitBounds(bounds, 0);
            }
          } catch {}
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
