import { useState } from "react";
import { useDebounce, useSetState } from "react-use";

import { LinearProgress, Stack } from "@mui/material";

import { NextPage } from "next";

import FiltersBar from "components/FiltersBar";
import ListingsCard from "components/ListingsCard";
import ListingsMap from "components/ListingsMap";
import useQueryListings from "graphql/useQueryListings";
import usePlaceDetails from "hooks/usePlaceDetails";

const Home: NextPage = () => {
  const [map, setMap] = useState<google.maps.Map>();

  const [variables, setVariables] = useSetState<QueriesQueryListingsArgs>({
    currentPage: 1,
    rowsPerPage: 100,
    viewport: undefined,
    // unused
    freeText: undefined,
    listingId: undefined,
    addressState: undefined,
  });
  const [debouncedVariables, setDebouncedVariables] = useSetState(variables);

  useDebounce(
    () => {
      setDebouncedVariables(variables);
    },
    200,
    [variables]
  );

  const { data: queryListings, isFetching: queryListingsIsFetching } =
    useQueryListings(debouncedVariables, {
      keepPreviousData: true,
    });
  const {
    data: queryListingsForMap,
    isFetching: queryListingsForMapIsFetching,
  } = useQueryListings(
    {
      ...debouncedVariables,
      currentPage: undefined,
      rowsPerPage: 10000,
    },
    {
      keepPreviousData: true,
    }
  );

  const [placeId, setPlaceId] = useState("ChIJYeZuBI9YwokRjMDs_IEyCwo");
  const [hovering, setHovering] = useState<SingleListing["listingId"]>();

  usePlaceDetails(
    {
      map,
      placeId,
    },
    {
      onSuccess: (result) => {
        const { geometry } = result;

        if (geometry?.location) {
          map?.setCenter(geometry?.location);
        }

        if (geometry?.viewport) {
          map?.fitBounds(geometry?.viewport);

          const viewport = geometry?.viewport.toJSON();

          setVariables({
            viewport: {
              low: {
                latitudes: viewport.north,
                longitudes: viewport.east,
              },
              high: {
                latitudes: viewport.south,
                longitudes: viewport.west,
              },
            },
          });
        }
      },
    }
  );

  return (
    <>
      <FiltersBar
        onChange={({ address }) => {
          setVariables({
            freeText: address,
            currentPage: 1,
          });
        }}
        onPredictionChange={(prediction) => {
          if (!prediction) {
            return;
          }
          setPlaceId(prediction.place_id);
        }}
      />
      <Stack
        direction="row"
        sx={{
          flex: 1,
          position: "relative",
        }}
      >
        {(queryListingsIsFetching || queryListingsForMapIsFetching) && (
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
        <Stack
          sx={{
            width: 485,
            position: "relative",
          }}
        >
          <ListingsCard
            isLoading={queryListingsIsFetching}
            queryListing={queryListings?.queryListings}
            onPageChange={(currentPage) => {
              setVariables({
                currentPage,
              });
            }}
            CardProps={{
              sx: {
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: 1,
              },
            }}
            ListingsItemProps={(listingId) => ({
              onMouseOver: () => {
                setHovering(listingId);
              },
              onMouseOut: () => {
                if (hovering === listingId) {
                  setHovering(undefined);
                }
              },
            })}
          />
        </Stack>
        <ListingsMap
          listings={queryListingsForMap?.queryListings.listings}
          GoogleMapProps={{
            mapContainerStyle: {
              flex: 1,
            },
            onLoad: (map) => {
              setMap(map);
            },
            onBoundsChanged: () => {
              const bounds = map?.getBounds()?.toJSON();

              if (bounds) {
                setVariables({
                  viewport: {
                    low: {
                      latitudes: bounds.north,
                      longitudes: bounds.east,
                    },
                    high: {
                      latitudes: bounds.south,
                      longitudes: bounds.west,
                    },
                  },
                });
              }
            },
          }}
          MarkersProps={{
            hovering,
          }}
        />
      </Stack>
    </>
  );
};

export default Home;
