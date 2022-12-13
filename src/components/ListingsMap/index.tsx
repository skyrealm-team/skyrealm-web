import { ClassAttributes, FC, useState } from "react";
import { useToggle, useUpdateEffect } from "react-use";

import { LinearProgress } from "@mui/material";

import { GoogleMap, GoogleMapProps } from "@react-google-maps/api";

import { Filters } from "components/FiltersBar";
import useQueryListings from "graphql/useQueryListings";
import useDefaultBounds from "hooks/useDefaultBounds";
import useRouterState from "hooks/useRouterState";

import Markers, { MarkersProps } from "./Markers";

export type ListingsMapProps = {
  GoogleMapProps?: GoogleMapProps & ClassAttributes<GoogleMap>;
  MarkersProps?: MarkersProps;
};
const ListingsMap: FC<ListingsMapProps> = ({
  GoogleMapProps,
  MarkersProps,
}) => {
  const { routerState, setRouterState } = useRouterState<{
    queryListingsArgs: QueriesQueryListingsArgs;
    filters: Filters;
  }>();

  const [boundsPrevented, preventBounds] = useToggle(false);
  const [defaultBounds, setDefaultBounds] = useDefaultBounds();
  const [initialBounds] = useState(defaultBounds);
  const { data, isFetching } = useQueryListings(
    {
      ...routerState.queryListingsArgs,
      bounds: {
        ...defaultBounds,
        ...routerState.queryListingsArgs?.bounds,
      },
      currentPage: 1,
      rowsPerPage: 500,
    },
    {
      keepPreviousData: true,
    }
  );

  const [map, setMap] = useState<google.maps.Map>();

  useUpdateEffect(() => {
    preventBounds(true);

    setTimeout(() => {
      const bounds = routerState.queryListingsArgs?.bounds;
      if (!bounds) {
        map?.fitBounds(initialBounds, 0);
      } else {
        const east = bounds?.east;
        const west = bounds?.west;
        const north = bounds?.north;
        const south = bounds?.south;
        if (east && west && north && south) {
          map?.fitBounds(
            {
              east,
              west,
              north,
              south,
            },
            0
          );
        }
      }
    });
  }, [routerState.queryListingsArgs?.bounds]);

  return (
    <GoogleMap
      zoom={5}
      clickableIcons={false}
      {...GoogleMapProps}
      onLoad={(map) => {
        setMap(map);
        map?.fitBounds(
          {
            ...defaultBounds,
            ...routerState.queryListingsArgs?.bounds,
          },
          0
        );

        GoogleMapProps?.onLoad?.(map);
      }}
      onBoundsChanged={() => {
        const bounds = map?.getBounds()?.toJSON();

        if (bounds) {
          if (boundsPrevented) {
            setDefaultBounds(bounds);
            preventBounds(false);
          } else {
            setRouterState({
              queryListingsArgs: {
                bounds,
              },
              filters: {
                address: "",
              },
            });
          }
        }

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
