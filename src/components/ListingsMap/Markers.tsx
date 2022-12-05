import React, { FC, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import InfoMarker, { InfoMarkerProps } from './InfoMarker';

export type MarkersProps = {
  listings?: Maybe<SingleListing>[];
  MarkerProps?: InfoMarkerProps;
  hovering?: SingleListing['listingId'];
  selections?: Array<SingleListing['listingId']>;
};
const Markers: FC<MarkersProps> = ({ listings, MarkerProps, hovering, selections }) => {
  const [selected, setSelected] = useState<SingleListing['listingId']>();

  useUpdateEffect(() => {
    setSelected(selections?.[selections?.length - 1]);
  }, [selections]);

  return (
    <>
      {listings?.map((listing) => (
        <InfoMarker
          key={listing?.listingId}
          {...MarkerProps}
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
  );
};

export default Markers;
