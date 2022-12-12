import { FC, useState } from "react";
import { useUpdateEffect } from "react-use";

import { MarkerClusterer, MarkerClustererProps } from "@react-google-maps/api";
import { Clusterer } from "@react-google-maps/marker-clusterer";

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
  const [clusterer, setClusterer] = useState<Clusterer>();

  useUpdateEffect(() => {
    clusterer?.setMinimumClusterSize(
      Math.round(50000 / Number(listings?.length ?? 1))
    );
    clusterer?.repaint();
  }, [listings?.length]);

  const [selected, setSelected] = useState<SingleListing["listingId"]>();

  useUpdateEffect(() => {
    setSelected(selections?.[selections?.length - 1]);
  }, [selections]);

  return (
    <MarkerClusterer
      {...props}
      onLoad={(clusterer) => {
        setClusterer(clusterer);
        props.onLoad?.(clusterer);
      }}
      options={{
        styles: Array.from(new Array(6)).map((_, index) => ({
          width: (index + 2) * 10,
          height: (index + 2) * 10,
          url: `/icons/pin${index + 1}.png`,
          textColor: "#fff",
        })),
        ...props.options,
      }}
    >
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
