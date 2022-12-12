import { ClassAttributes, FC, useState } from "react";
import { useUpdateEffect } from "react-use";

import { useRouter } from "next/router";

import { LinearProgress } from "@mui/material";

import { GoogleMap, GoogleMapProps } from "@react-google-maps/api";

import useQueryListings from "graphql/useQueryListings";

import Markers, { MarkersProps } from "./Markers";

const defaultBounds = {
  east: -73.8933254265425,
  north: 40.82950309443075,
  south: 40.68860118615344,
  west: -74.04513657345743,
};

export type ListingsMapProps = {
  GoogleMapProps?: GoogleMapProps & ClassAttributes<GoogleMap>;
  MarkersProps?: MarkersProps;
};
const ListingsMap: FC<ListingsMapProps> = ({
  GoogleMapProps,
  MarkersProps,
}) => {
  const router = useRouter();
  const queryListingArgs: QueriesQueryListingsArgs = JSON.parse(
    String(router.query.listingsArgs ?? "{}")
  );

  const { data, isFetching } = useQueryListings(
    {
      ...queryListingArgs,
      bounds: queryListingArgs.bounds,
      currentPage: 1,
      rowsPerPage: 0,
    },
    {
      keepPreviousData: true,
    }
  );

  const [map, setMap] = useState<google.maps.Map>();

  useUpdateEffect(() => {
    if (!queryListingArgs.bounds) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          listingsArgs: JSON.stringify({
            ...queryListingArgs,
            bounds: defaultBounds,
          }),
        },
      });

      map?.fitBounds(defaultBounds);
    }
  }, [queryListingArgs.bounds]);

  return (
    <GoogleMap
      zoom={5}
      clickableIcons={false}
      {...GoogleMapProps}
      onLoad={(map) => {
        setMap(map);
        map?.fitBounds({
          ...defaultBounds,
          ...queryListingArgs.bounds,
        });

        GoogleMapProps?.onLoad?.(map);
      }}
      onBoundsChanged={() => {
        const bounds = map?.getBounds();

        router.push({
          pathname: router.pathname,
          query: {
            ...router.query,
            listingsArgs: JSON.stringify({
              ...queryListingArgs,
              bounds: bounds?.toJSON(),
            }),
          },
        });

        GoogleMapProps?.onBoundsChanged?.();
      }}
      options={{
        minZoom: 2,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
        controlSize: 30,
        disableDefaultUI: false,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        ...GoogleMapProps?.options,
      }}
    >
      {isFetching && (
        <LinearProgress
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 2,
          }}
        />
      )}
      <Markers {...MarkersProps} listings={data?.queryListings.listings} />
    </GoogleMap>
  );
};

export default ListingsMap;
