import React, { FC, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import InfoMarker, { InfoMarkerProps } from './InfoMarker';

export type MarkersProps = {
  listings?: Maybe<SingleListing>[];
  MarkerProps?: InfoMarkerProps;
  selection?: SingleListing['listingId'];
};
const Markers: FC<MarkersProps> = ({ listings, MarkerProps, selection }) => {
  const [selected, setSelected] = useState<SingleListing['listingId']>();

  useUpdateEffect(() => {
    if (selection) {
      setSelected(selection);
    }
  }, [selection]);

  return (
    <>
      {listings?.map((listing) => (
        <InfoMarker
          key={listing?.listingId}
          {...MarkerProps}
          listing={listing}
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
