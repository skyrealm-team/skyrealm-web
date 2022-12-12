import { FC, useMemo, useState } from "react";
import { useUpdateEffect } from "react-use";

import { MarkerClustererProps, useGoogleMap } from "@react-google-maps/api";
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
}) => {
  const [clusterer] = useState<Clusterer>();

  const googleMap = useGoogleMap();
  const bounds = googleMap?.getBounds();
  const data = useMemo(
    () =>
      listings?.filter((listing) =>
        bounds?.contains({
          lat: Number(listing?.latitude),
          lng: Number(listing?.longitude),
        })
      ),
    [listings, bounds]
  );

  useUpdateEffect(() => {
    clusterer?.setMinimumClusterSize(
      Math.round(50000 / Number(data?.length ?? 1))
    );
    clusterer?.repaint();
  }, [data?.length]);

  const [selected, setSelected] = useState<SingleListing["listingId"]>();

  useUpdateEffect(() => {
    setSelected(selections?.[selections?.length - 1]);
  }, [selections]);

  if (!data) {
    return null;
  }

  return (
    // <MarkerClusterer {...props} onLoad={(clusterer) => {
    //   setClusterer(clusterer)
    //   props.onLoad?.(clusterer)
    // }}  options={{
    //   enableRetinaIcons: true,
    //   styles: Array.from(new Array(6)).map((_, index) => ({
    //     width: (index + 2) * 10,
    //     height: (index + 2) * 10,
    //     url: `/icons/pin${index + 1}.png`,
    //     textColor: "#fff",
    //   })),
    //   ...props.options
    // }}>
    //   {(clusterer) => (
    <>
      {data?.map((listing) => (
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
    //   )}
    // </MarkerClusterer>
  );
};

export default Markers;
