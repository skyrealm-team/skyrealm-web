import { ClassAttributes, FC, useState } from "react";
import { useUpdateEffect } from "react-use";

import { LinearProgress } from "@mui/material";

import { GoogleMap, GoogleMapProps } from "@react-google-maps/api";
import { defaultsDeep } from "lodash";

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

  const [defaultBounds, setDefaultBounds] = useDefaultBounds();
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
    map?.set("boundsPrevented", true);

    setTimeout(() => {
      const bounds = routerState.queryListingsArgs?.bounds;
      if (!bounds) {
        map?.fitBounds(map?.get("defaultBounds") ?? defaultBounds, 0);
      } else {
        map?.fitBounds(defaultsDeep(bounds, defaultBounds), 0);
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
          if (map?.get("boundsPrevented") !== false) {
            setDefaultBounds(bounds);
            if (!map?.get("defaultBounds")) {
              map?.set("defaultBounds", bounds);
            }
            map?.set("boundsPrevented", false);
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
