import { FC } from "react";

import { Marker, MarkerProps } from "@react-google-maps/api";

export type CircleMarkerProps = MarkerProps;
const CircleMarker: FC<CircleMarkerProps> = ({ ...props }) => {
  return (
    <Marker
      icon={{
        url: "/icons/pin-circle.svg",
        anchor: new google.maps.Point(70, 70),
        scaledSize: new google.maps.Size(140, 140),
      }}
      {...props}
      options={{
        optimized: true,
        ...props?.options,
      }}
    />
  );
};

export default CircleMarker;
