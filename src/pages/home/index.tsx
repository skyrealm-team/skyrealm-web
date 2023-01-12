import { useState } from "react";

import { NextPage } from "next";

import { List, Map } from "@mui/icons-material";
import {
  Fab,
  FabProps,
  Stack,
  Theme,
  useMediaQuery,
  Zoom,
} from "@mui/material";

import { LoadScriptNext, LoadScriptProps } from "@react-google-maps/api";

import ListingsCard from "components/ListingsCard";
import ListingsFiltersBar from "components/ListingsFiltersBar";
import ListingsMap from "components/ListingsMap";
import Loading from "components/Loading";

const libraries: LoadScriptProps["libraries"] = ["places"];

type FAB = "list" | "map";
const Home: NextPage = () => {
  const upSM = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
  const [fab, setFab] = useState<FAB>("map");

  const [hovering, setHovering] = useState<SingleListing["listingId"]>();

  const fabs: {
    key: FAB;
    FabProps: FabProps;
  }[] = [
    {
      key: "list",
      FabProps: {
        color: "secondary",
        children: <Map />,
      },
    },
    {
      key: "map",
      FabProps: {
        color: "info",
        children: <List />,
      },
    },
  ];

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
            position: "relative",
          }}
        >
          {(upSM || fab === "list") && (
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
          )}
          {(upSM || fab === "map") && (
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
          )}
          {!upSM && (
            <>
              {fabs.map(({ key, FabProps }, index) => (
                <Zoom key={index} in={key === fab} unmountOnExit>
                  <Fab
                    {...FabProps}
                    onClick={() => {
                      const next = index + 1;
                      setFab(fabs[next < fabs.length ? next : 0].key);
                    }}
                    sx={(theme) => ({
                      position: "absolute",
                      left: theme.spacing(1),
                      bottom: theme.spacing(1),
                    })}
                  />
                </Zoom>
              ))}
            </>
          )}
        </Stack>
      </>
    </LoadScriptNext>
  );
};

export default Home;
