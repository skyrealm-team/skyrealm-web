import { useState } from "react";

import { NextPage } from "next";

import { Stack } from "@mui/material";

import { LoadScriptNext, LoadScriptProps } from "@react-google-maps/api";

import ListingsCard from "components/ListingsCard";
import ListingsFiltersBar from "components/ListingsFiltersBar";
import ListingsMap from "components/ListingsMap";
import Loading from "components/Loading";

const libraries: LoadScriptProps["libraries"] = ["places"];

const Home: NextPage = () => {
  const [hovering, setHovering] = useState<SingleListing["listingId"]>();

  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
      libraries={libraries}
      loadingElement={<Loading />}
    >
      <>
        <ListingsFiltersBar />
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
                ListItemButtonProps: {
                  onMouseOver: () => {
                    setHovering(listingId);
                  },
                  onMouseOut: () => {
                    if (hovering === listingId) {
                      setHovering(undefined);
                    }
                  },
                },
              })}
            />
          </Stack>
          <ListingsMap
            GoogleMapProps={{
              mapContainerStyle: {
                flex: 1,
              },
            }}
            MarkersProps={{
              hovering,
            }}
          />
        </Stack>
      </>
    </LoadScriptNext>
  );
};

export default Home;
