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
    freeText: "Manhattan",
    currentPage: 1,
    listingId: undefined,
    addressState: undefined,
  });
  const { data: queryListings, isFetching } = useQueryListings(variables, {
    keepPreviousData: true,
  });

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
      {isFetching && <LinearProgress />}
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
            isLoading={isFetching}
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
          listings={queryListings?.queryListings.listings}
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
