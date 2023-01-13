import { ClassAttributes, FC, useState } from "react";
import { useUpdateEffect } from "react-use";

import { LinearProgress } from "@mui/material";

import { GoogleMap, GoogleMapProps } from "@react-google-maps/api";
import { debounce, defaultsDeep } from "lodash";

import useQueryListings from "graphql/useQueryListings";
import useDefaultBounds from "hooks/useDefaultBounds";
import useQueryListingsArgs from "hooks/useQueryListingsArgs";

import Markers, { MarkersProps } from "./Markers";

export type ListingsMapProps = {
  GoogleMapProps?: GoogleMapProps & ClassAttributes<GoogleMap>;
  MarkersProps?: MarkersProps;
};
const ListingsMap: FC<ListingsMapProps> = ({
  GoogleMapProps,
  MarkersProps,
}) => {
  const { queryListingsArgs, setQueryListingsArgs } = useQueryListingsArgs();
  const setQueryListingsArgsDebounced = debounce(setQueryListingsArgs, 500);

  const [defaultBounds, setDefaultBounds] = useDefaultBounds();
  const { data, isFetching } = useQueryListings(
    {
      ...queryListingsArgs,
      bounds: defaultsDeep(queryListingsArgs.bounds, defaultBounds),
      currentPage: ~~(((queryListingsArgs.currentPage ?? 1) - 1) / 5) + 1,
      rowsPerPage: 500,
    },
    {
      keepPreviousData: true,
    }
  );

  const [map, setMap] = useState<google.maps.Map>();

  useUpdateEffect(() => {
    const bounds = queryListingsArgs.bounds;
    map?.set("boundsPrevented", true);
    map?.fitBounds(defaultsDeep(bounds, defaultBounds), 0);
  }, [queryListingsArgs.bounds]);

  return (
    <GoogleMap
      zoom={5}
      {...GoogleMapProps}
      onLoad={(map) => {
        setMap(map);
        map?.fitBounds(
          defaultsDeep(queryListingsArgs.bounds, defaultBounds),
          0
        );

        GoogleMapProps?.onLoad?.(map);
      }}
      onCenterChanged={() => {
        const bounds = map?.getBounds()?.toJSON();

        if (bounds && Object.values(bounds).every((item) => !isNaN(item))) {
          if (map?.get("boundsPrevented") !== false) {
            map?.set("boundsPrevented", false);
            setDefaultBounds(bounds);
          } else {
            setQueryListingsArgsDebounced({
              bounds,
              currentPage: 1,
              address: "",
            });
          }
        }

        GoogleMapProps?.onCenterChanged?.();
      }}
      options={{
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
        minZoom: 2,
        clickableIcons: false,
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
      <Markers {...MarkersProps} listings={data?.listings} />
    </GoogleMap>
  );
};

export default ListingsMap;
