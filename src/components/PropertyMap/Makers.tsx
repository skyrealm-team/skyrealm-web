import { FC } from "react";

import { Marker, MarkerProps } from "@react-google-maps/api";

export type MakersProps = MarkerProps;
const Makers: FC<MakersProps> = ({ ...props }) => {
  return (
    <>
      <Marker
        {...props}
        icon={{
          url: "/icons/pin-ellipse.svg",
          anchor: new google.maps.Point(97, 97),
          scaledSize: new google.maps.Size(194, 194),
        }}
        options={{
          optimized: true,
          ...props?.options,
        }}
      />
      <Marker
        {...props}
        icon={{
          url: "/icons/pin-location.svg",
          anchor: new google.maps.Point(28, 28),
          scaledSize: new google.maps.Size(56, 56),
        }}
        options={{
          optimized: true,
          ...props?.options,
        }}
      />
    </>
  );
};

export default Makers;
