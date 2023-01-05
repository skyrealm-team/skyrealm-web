import { CSSProperties, Fragment, useMemo, useRef } from "react";
import { dehydrate, QueryClient } from "react-query";
import { useWindowScroll } from "react-use";

import { GetServerSideProps } from "next";
import Error from "next/error";
import { useRouter } from "next/router";

import {
  Avatar,
  Container,
  Divider,
  Stack,
  Typography,
  Unstable_Grid2,
} from "@mui/material";

import moment from "moment";

import TelIcon from "assets/icons/tel.svg";
import ContactButton from "components/ContactButton";
import ImageCarousel from "components/ImageCarousel";
import InfoCard from "components/InfoCard";
import PropertyHeader from "components/PropertyHeader";
import PropertyMap from "components/PropertyMap";
import useQueryListing, {
  queryListingQuery,
  queryListingRequest,
} from "graphql/useQueryListing";
import PropertyLayout from "layouts/PropertyLayout";
import { NextPageWithLayout } from "pages/_app";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { lid } = context.query;

  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery(
      [
        queryListingQuery,
        {
          listingId: String(lid),
        },
      ],
      () => {
        return queryListingRequest({
          variables: {
            listingId: String(lid),
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

const PropertyInfo: NextPageWithLayout = () => {
  const router = useRouter();
  const { lid } = router.query;

  const { data: listing, isLoading: listingIsLoading } = useQueryListing({
    listingId: lid && String(lid),
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const brokerRef = useRef<HTMLDivElement>(null);
  const windowScroll = useWindowScroll();

  const brokerStyle = useMemo<CSSProperties>(() => {
    const rootRect = rootRef.current?.getBoundingClientRect();
    const brokerRect = brokerRef.current?.getBoundingClientRect();
    const right = (rootRect?.right ?? 0) - (brokerRect?.right ?? 0);
    const top = (rootRect?.top ?? 0) + windowScroll.y;

    if (!brokerRect) {
      return {};
    }

    if (brokerRect?.top >= top + right) {
      return {};
    }

    return {
      position: "fixed",
      width: brokerRect.width,
      top: top + right,
      right: right,
    };
  }, [windowScroll]);

  if (!listingIsLoading && !listing?.paid) {
    return <Error statusCode={403} withDarkMode={false} />;
  }

  return (
    <Stack ref={rootRef}>
      <PropertyHeader listing={listing} />
      <ImageCarousel images={listing?.pics ?? []} />
      <Container
        maxWidth={false}
        sx={{
          py: 3,
        }}
      >
        <Stack direction="row" alignItems="flex-start" gap={3}>
          <Stack
            gap={4}
            px={{
              flex: 1,
            }}
          >
            <InfoCard
              CardContentProps={{
                sx: {
                  px: 3,
                  pt: 2.6,
                  pb: 2.2,
                },
              }}
            >
              <Unstable_Grid2 container spacing={4}>
                {[
                  {
                    key: "Size",
                    value: `${formatter.format(listing?.size ?? 0)} SF`,
                  },
                  {
                    key: "Ceiling",
                    value: formatter.format(listing?.ceiling ?? 0),
                  },
                  {
                    key: "Frontage",
                    value: formatter.format(listing?.frontage ?? 0),
                  },
                  {
                    key: "Asking rent",
                    value: formatter.format(listing?.rentPrice ?? 0),
                  },
                  {
                    key: "Possession",
                    value: (() => {
                      const possession = moment(
                        listing?.possession ?? Date.now()
                      );

                      return possession.isAfter(Date.now())
                        ? possession.format("YYYY-MM-DD")
                        : "Immediate";
                    })(),
                  },
                ].map(({ key, value }, index) => (
                  <Unstable_Grid2
                    key={index}
                    container
                    alignItems="center"
                    spacing={0}
                    xs={12}
                    sm={6}
                  >
                    <Unstable_Grid2 xs={6}>
                      <Typography
                        noWrap
                        sx={{
                          color: "#999999",
                          fontSize: 18,
                          fontWeight: 600,
                        }}
                      >
                        {key}
                      </Typography>
                    </Unstable_Grid2>
                    <Unstable_Grid2 xs={6}>
                      <Typography
                        noWrap
                        sx={{
                          color: "#333333",
                          fontSize: 20,
                          fontWeight: 600,
                        }}
                      >
                        {value}
                      </Typography>
                    </Unstable_Grid2>
                  </Unstable_Grid2>
                ))}
              </Unstable_Grid2>
            </InfoCard>
            <InfoCard title="Property overview">
              <Typography
                sx={{
                  color: "#333333",
                  lineHeight: "34px",
                }}
              >
                {listing?.overview}
              </Typography>
            </InfoCard>
            <InfoCard title="MAP">
              <PropertyMap
                listing={listing}
                mapContainerStyle={{
                  aspectRatio: 1177 / 550,
                }}
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
            </InfoCard>
            <InfoCard title="Broker info">
              <Stack gap={4}>
                {[
                  {
                    name: "Mark Boisi, Executive Vice Chair",
                    tel: "(754) 465-7291",
                    info: "Mark Boisi has been active in commercial real estate in New York City since 1975 when he started his career with Cross & Brown Co. In 1978, he was a founding member of Abrams Benisch Riker Inc., which became Colliers ABR Inc., one of the predecessor companies to Cassidy Turley. Over his 35-year career, Mark’s primary focus has been on corporate and institutional real estate, principally in tenant representation, property management, and leasing assignments. He has coordinated real estate projects on behalf of dozens of corporate users and owners. He was the co-head of Cassidy Turley's $400 million joint venture investment fund with AEW Capital, which invested in commercial property in the New York metropolitan area.",
                  },
                  {
                    name: "Mark Boisi, Executive Vice Chair",
                    tel: "(754) 465-7291",
                    info: "Mark Boisi has been active in commercial real estate in New York City since 1975 when he started his career with Cross & Brown Co. In 1978, he was a founding member of Abrams Benisch Riker Inc., which became Colliers ABR Inc., one of the predecessor companies to Cassidy Turley. Over his 35-year career, Mark’s primary focus has been on corporate and institutional real estate, principally in tenant representation, property management, and leasing assignments. He has coordinated real estate projects on behalf of dozens of corporate users and owners. He was the co-head of Cassidy Turley's $400 million joint venture investment fund with AEW Capital, which invested in commercial property in the New York metropolitan area.",
                  },
                ].map(({ name, tel, info }, index, list) => (
                  <Fragment key={index}>
                    <Stack direction="row" gap={3}>
                      <Stack gap={1.7} alignItems="center">
                        <Avatar
                          variant="rounded"
                          sx={{
                            width: 170,
                            height: 170,
                          }}
                        ></Avatar>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <TelIcon />
                          <Typography>{tel}</Typography>
                        </Stack>

                        <ContactButton size="small" />
                      </Stack>
                      <Stack>
                        <Typography
                          paragraph
                          sx={{
                            fontWeight: 700,
                          }}
                        >
                          {name}
                        </Typography>
                        <Typography>{info}</Typography>
                      </Stack>
                    </Stack>
                    {index < list.length - 1 && (
                      <Divider
                        sx={{
                          ml: 20,
                        }}
                      />
                    )}
                  </Fragment>
                ))}
              </Stack>
            </InfoCard>
          </Stack>
          <Stack
            ref={brokerRef}
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
              width: 340,
            }}
          >
            <InfoCard
              CardProps={{
                sx: {
                  ...brokerStyle,
                },
              }}
              CardContentProps={{
                sx: {
                  py: 3.2,
                },
              }}
            >
              <Stack gap={3} alignItems="center">
                <Stack gap={1} alignItems="center">
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: 130,
                      height: 130,
                    }}
                  ></Avatar>
                  <Stack alignItems="center">
                    <Typography
                      paragraph
                      sx={{
                        fontSize: 18,
                        fontWeight: 700,
                      }}
                    >
                      Steve Johnson
                    </Typography>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <TelIcon />
                      <Typography>(754) 465-7291</Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <ContactButton />
              </Stack>
            </InfoCard>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

PropertyInfo.getLayout = (page) => {
  return <PropertyLayout>{page}</PropertyLayout>;
};

export default PropertyInfo;
