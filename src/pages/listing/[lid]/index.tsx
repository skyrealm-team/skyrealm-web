import React, { useEffect } from "react";
import { dehydrate, QueryClient } from "react-query";
import { useMeasure } from "react-use";

import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import Error from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Alert,
  Container,
  Drawer,
  ListItemIcon,
  ListItemIconProps,
  ListItemText,
  ListItemTextProps,
  MenuItem,
  MenuItemProps,
  MenuList,
  Stack,
  Toolbar,
} from "@mui/material";

import NearbyResidentsIcon from "assets/icons/nearby-residents.svg";
import PropertyInfoIcon from "assets/icons/property-info.svg";
import VisitorProfileIcon from "assets/icons/visitor-profile.svg";
import VisitsIcon from "assets/icons/visits.svg";
import ContactButton from "components/ContactButton";
import ImageCarousel from "components/ImageCarousel";
import PropertyHeader from "components/PropertyHeader";
import PropertyInfo from "components/PropertyInfo";
import PropertyMap from "components/PropertyMap";
import PropertyVisitor from "components/PropertyVisitor";
import PropertyVisits from "components/PropertyVisits";
import useQueryListing, {
  queryListingRequest,
  queryListingQuery,
} from "graphql/useQueryListing";

enum Tabs {
  "property-info" = "property-info",
  "visits" = "visits",
  "visitor-profile" = "visitor-profile",
  "nearby-residents" = "nearby-residents",
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { lid: listingId } = context.query;

  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery(
      [
        queryListingQuery,
        {
          listingId: String(listingId),
        },
      ],
      () => {
        return queryListingRequest({
          variables: {
            listingId: String(listingId),
          },
        });
      }
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Listing: NextPage = () => {
  const router = useRouter();
  const { lid: listingId } = router.query;

  const { data: listing, isLoading: listingIsLoading } = useQueryListing({
    listingId: listingId && String(listingId),
  });

  const { t: tab = listing?.paid ? Tabs["property-info"] : Tabs.visits } =
    router.query;

  const menu: {
    key: Tabs;
    MenuItemProps?: MenuItemProps;
    ListItemIconProps?: ListItemIconProps;
    ListItemTextProps?: ListItemTextProps;
  }[] = [
    ...(listing?.paid
      ? [
          {
            key: Tabs["property-info"],
            ListItemIconProps: {
              children: <PropertyInfoIcon />,
            },
            ListItemTextProps: {
              children: "Property info",
            },
          },
        ]
      : []),
    {
      key: Tabs.visits,
      ListItemIconProps: {
        children: <VisitsIcon />,
      },
      ListItemTextProps: {
        children: "Visits",
      },
    },
    {
      key: Tabs["visitor-profile"],
      ListItemIconProps: {
        children: <VisitorProfileIcon />,
      },
      ListItemTextProps: {
        children: "Visitor profile",
      },
    },
    {
      key: Tabs["nearby-residents"],
      ListItemIconProps: {
        children: <NearbyResidentsIcon />,
      },
      ListItemTextProps: {
        children: "Nearby residents",
      },
    },
  ];

  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const tabIsInvalid = !Object.keys(Tabs).includes(String(tab));
  const tabIsUnpaid = !listing?.paid && tab === Tabs["property-info"];

  useEffect(() => {
    if (tabIsInvalid || tabIsUnpaid) {
      router.replace({
        pathname: `/listing/${listingId}`,
      });
    }
  }, [tabIsInvalid, tabIsUnpaid, router, listingId]);

  if (tabIsInvalid || (!listingIsLoading && !listing)) {
    return <Error statusCode={404} withDarkMode={false} />;
  }

  return (
    <>
      <NextSeo
        title={`${listing?.address} | Skyrealm`}
        description={listing?.overview ?? undefined}
      />
      <Stack direction="row">
        <Drawer
          variant="permanent"
          PaperProps={{
            ref,
            elevation: 0,
            square: true,
            sx: {
              width: "fit-content",
              filter: "drop-shadow(4px 0px 26px rgba(0, 0, 0, 0.03))",
              alignItems: "center",
            },
          }}
          sx={(theme) => ({
            width,
            zIndex: theme.zIndex.appBar - 1,
          })}
        >
          <Toolbar />
          <MenuList
            component={Stack}
            gap={1}
            sx={{
              py: 1.75,
            }}
          >
            {menu.map(
              ({
                key,
                MenuItemProps,
                ListItemIconProps,
                ListItemTextProps,
              }) => {
                const selected = key === tab || MenuItemProps?.selected;

                return (
                  <Link
                    key={key}
                    href={{
                      pathname: `/listing/${listingId}`,
                      query: {
                        t: key,
                      },
                    }}
                    legacyBehavior
                    shallow
                    scroll
                  >
                    <MenuItem
                      {...MenuItemProps}
                      sx={{
                        px: 3.4,
                        py: 0.8,
                      }}
                    >
                      <ListItemIcon
                        {...ListItemIconProps}
                        sx={(theme) => ({
                          color: "#333333",
                          ...(selected && {
                            color: theme.palette.primary.main,
                          }),
                        })}
                      />
                      <ListItemText
                        disableTypography
                        {...ListItemTextProps}
                        sx={(theme) => ({
                          color: "#999999",
                          ...(selected && {
                            color: theme.palette.primary.main,
                            fontWeight: 700,
                          }),
                        })}
                      />
                    </MenuItem>
                  </Link>
                );
              }
            )}
          </MenuList>
          <ContactButton
            sx={{
              width: 190,
              height: 50,
            }}
          />
        </Drawer>
        <Stack
          sx={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          <PropertyHeader listing={listing} />
          {tabIsUnpaid ? (
            <Error statusCode={403} withDarkMode={false} />
          ) : (
            <>
              {tab === Tabs["property-info"] && (
                <ImageCarousel images={listing?.pics ?? []} />
              )}
              {(tab === Tabs.visits || tab === Tabs["visitor-profile"]) && (
                <PropertyMap
                  listing={listing}
                  center={{
                    lat: Number(listing?.latitude),
                    lng: Number(listing?.longitude),
                  }}
                  zoom={Math.log2((40000000 * 194) / 152.4 / 256 / 2)}
                  MarkerProps={{
                    position: {
                      lat: Number(listing?.latitude),
                      lng: Number(listing?.longitude),
                    },
                  }}
                />
              )}
              {tab === Tabs["nearby-residents"] && (
                <PropertyMap listing={listing} polyGeom />
              )}
              <Container
                {...(tab === Tabs["property-info"] && {
                  maxWidth: false,
                })}
                sx={{
                  ...(tab !== Tabs["property-info"] && {
                    maxWidth: 1360,
                  }),
                  py: 3,
                }}
              >
                {tab === Tabs["property-info"] ? (
                  <PropertyInfo listing={listing} />
                ) : (
                  <Stack gap={4}>
                    <Alert severity="info">
                      Data range: {listing?.stats["timeStart"]} -{" "}
                      {listing?.stats["timeEnd"]}
                    </Alert>
                    {tab === Tabs.visits && (
                      <PropertyVisits
                        listing={listing}
                        isLoading={listingIsLoading}
                      />
                    )}
                    {(tab === Tabs["visitor-profile"] ||
                      tab === Tabs["nearby-residents"]) && (
                      <PropertyVisitor
                        listing={listing}
                        isLoading={listingIsLoading}
                      />
                    )}
                  </Stack>
                )}
              </Container>
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Listing;
