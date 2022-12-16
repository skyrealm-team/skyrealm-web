import { useState } from "react";

import { Stack } from "@mui/material";

import { NextPage } from "next";

import ListingsCard from "components/ListingsCard";
import ListingsFiltersBar from "components/ListingsFiltersBar";
import ListingsMap from "components/ListingsMap";

const Home: NextPage = () => {
  const [hovering, setHovering] = useState<SingleListing["listingId"]>();

  return (
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
  );
};

export default Home;
