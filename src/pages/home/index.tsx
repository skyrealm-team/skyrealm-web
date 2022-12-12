import { useState } from "react";

import { useRouter } from "next/router";

import { Stack } from "@mui/material";

import { NextPage } from "next";

import FiltersBar from "components/FiltersBar";
import ListingsCard from "components/ListingsCard";
import ListingsMap from "components/ListingsMap";
import usePlaceDetails from "hooks/usePlaceDetails";

const Home: NextPage = () => {
  const router = useRouter();
  const [map, setMap] = useState<google.maps.Map>();

  const [placeId, setPlaceId] = useState("");
  const [hovering, setHovering] = useState<SingleListing["listingId"]>();

  usePlaceDetails(
    {
      map,
      placeId,
    },
    {
      onSuccess: (result) => {
        const { geometry } = result;

        if (geometry?.viewport) {
          map?.fitBounds(geometry?.viewport);

          router.query.listingsArgs = JSON.stringify({
            ...JSON.parse(String(router.query.listings ?? "{}")),
            bounds: geometry?.viewport.toJSON(),
            currentPage: 1,
          });
          router.push(router);
        }
      },
    }
  );

  return (
    <>
      <FiltersBar
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
        }}
      >
        <Stack
          sx={{
            width: 485,
            position: "relative",
          }}
        >
          <ListingsCard
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
