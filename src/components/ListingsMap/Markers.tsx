import { FC, useState } from "react";
import { useUpdateEffect } from "react-use";

import { MarkerClusterer, MarkerClustererProps } from "@react-google-maps/api";

import InfoMarker, { InfoMarkerProps } from "./InfoMarker";

export type MarkersProps = Omit<MarkerClustererProps, "children"> & {
  listings?: Maybe<SingleListing>[];
  MarkerProps?: InfoMarkerProps;
  hovering?: SingleListing["listingId"];
  selections?: Array<SingleListing["listingId"]>;
};
const Markers: FC<MarkersProps> = ({
  listings,
  MarkerProps,
  hovering,
  selections,
  ...props
}) => {
  const [selected, setSelected] = useState<SingleListing["listingId"]>();

  useUpdateEffect(() => {
    setSelected(selections?.[selections?.length - 1]);
  }, [selections]);

  return (
    <MarkerClusterer minimumClusterSize={5} enableRetinaIcons {...props}>
      {(clusterer) => (
        <>
          {listings?.map((listing) => (
            <InfoMarker
              key={listing?.listingId}
              {...MarkerProps}
              clusterer={clusterer}
              listing={listing}
              hovered={hovering === listing?.listingId}
              selected={selected === listing?.listingId}
              onClick={() => {
                setSelected(listing?.listingId);
              }}
              InfoWindowProps={{
                ...MarkerProps?.InfoWindowProps,
                onCloseClick: () => {
                  setSelected(undefined);
                  MarkerProps?.InfoWindowProps?.onCloseClick?.();
                },
              }}
            />
          ))}
        </>
      )}
    </MarkerClusterer>
  );
};

export default Markers;
