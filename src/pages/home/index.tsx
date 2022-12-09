import { useState } from "react";
import { useSetState } from "react-use";

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
  const { data: queryListings, isFetching: queryListingsIsFetching } =
    useQueryListings(variables, {
      keepPreviousData: true,
    });
  const {
    data: queryListingsForMap,
    isFetching: queryListingsForMapIsFetching,
  } = useQueryListings(
    {
      ...variables,
      currentPage: undefined,
      rowsPerPage: 10000,
    },
    {
      keepPreviousData: true,
    }
  );

  const [prediction, setPrediction] = useState<
    Partial<google.maps.places.AutocompletePrediction>
  >({
    place_id: "ChIJYeZuBI9YwokRjMDs_IEyCwo",
    description: variables.freeText,
  });
  const [hovering, setHovering] = useState<SingleListing["listingId"]>();

  usePlaceDetails(
    {
      map,
      placeId: prediction.place_id ?? "",
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
          setPrediction(prediction);

          // const headers = new Headers({
          //   'X-Goog-Api-Key': process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
          // });

          // const placeTypes = [
          //   {
          //     place_type: 'POSTAL_CODE',
          //   },
          //   {
          //     place_type: 'ADMINISTRATIVE_AREA_LEVEL_1',
          //   },
          //   {
          //     place_type: 'ADMINISTRATIVE_AREA_LEVEL_2',
          //   },
          //   {
          //     place_type: 'ADMINISTRATIVE_AREA_LEVEL_3',
          //   },
          //   {
          //     place_type: 'ADMINISTRATIVE_AREA_LEVEL_4',
          //   },
          //   {
          //     place_type: 'LOCALITY',
          //   },
          //   {
          //     place_type: 'SUBLOCALITY_LEVEL_1',
          //   },
          //   {
          //     place_type: 'NEIGHBORHOOD',
          //   },
          //   {
          //     place_type: 'COUNTRY',
          //   },
          // ];

          // const response = await fetch('https://regionlookup.googleapis.com/v1alpha:searchRegion', {
          //   method: 'POST',
          //   headers,
          //   body: JSON.stringify({
          //     search_values: placeTypes.map((item) => ({
          //       region_code: 'US',
          //       address: prediction.description,
          //       ...item,
          //     })),
          //   }),
          // });

          // const result = await response.json();

          // console.log(
          //   placeTypes.map((item, index) => ({
          //     ...item,
          //     matchedPlaceId: result.matches[index].matchedPlaceId,
          //   })),
          // );
        }}
      />
      {(queryListingsIsFetching || queryListingsForMapIsFetching) && (
        <LinearProgress />
      )}
      <Stack
        direction="row"
        sx={{
          flex: 1,
        }}
      >
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
