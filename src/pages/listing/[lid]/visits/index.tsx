import { dehydrate, QueryClient } from "react-query";

import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { Container, Stack, Typography, Unstable_Grid2 } from "@mui/material";

import moment from "moment";

import InfoCard from "components/InfoCard";
import PropertyHeader from "components/PropertyHeader";
import PropertyMap from "components/PropertyMap";
import useQueryListingById, {
  queryListingByIdRequest,
} from "graphql/useQueryListingById";
import PropertyLayout from "layouts/PropertyLayout";
import { NextPageWithLayout } from "pages/_app";

const Charts = dynamic(() => import("components/Charts"), {
  ssr: false,
});

const formatter = Intl.NumberFormat("en", { notation: "compact" });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { lid } = context.query;

  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery(
      [
        useQueryListingById.name,
        {
          listingId: String(lid),
        },
      ],
      () => {
        return queryListingByIdRequest({
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

const Visits: NextPageWithLayout = () => {
  const router = useRouter();
  const { lid } = router.query;

  const { data: listing, isLoading: listingIsLoading } = useQueryListingById({
    listingId: lid && String(lid),
  });

  return (
    <Stack>
      <PropertyHeader listing={listing} />
      <PropertyMap
        mapContainerStyle={{
          aspectRatio: 1667 / 410,
        }}
        {...(listing && {
          MarkerProps: {
            position: {
              lat: Number(listing?.latitude),
              lng: Number(listing?.longitude),
            },
          },
        })}
      />
      <Container
        sx={{
          maxWidth: 1360,
          py: 3,
        }}
      >
        <Stack gap={4}>
          <InfoCard title="Metrics">
            <Unstable_Grid2 container spacing={4}>
              {[
                {
                  key: "Visits",
                  value: formatter.format(listing?.totalVisits ?? 0),
                },
                {
                  key: "Visit Frequency",
                  value: formatter.format(listing?.frequency ?? 0),
                },
                {
                  key: "Visitors",
                  value: formatter.format(listing?.visitors ?? 0),
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
                        fontSize: 26,
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
          <InfoCard title="Visits Trend">
            <Charts
              isLoading={listingIsLoading}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visits",
                },
              }}
              LineSvgProps={{
                axisLeft: {
                  legend: "Visits",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Hourly Visits">
            <Charts
              types={["bar", "line"]}
              isLoading={listingIsLoading}
              data={listing?.stats["Time of day"]}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visits",
                },
                axisBottom: {
                  format: (value) => {
                    return value % 2 === 0
                      ? moment(value, "H").format("hh:mm A")
                      : "";
                  },
                },
              }}
              LineSvgProps={{
                axisLeft: {
                  legend: "Visits",
                },
                axisBottom: {
                  format: (value) => {
                    return value % 2 === 0
                      ? moment(value, "H").format("hh:mm A")
                      : "";
                  },
                },
              }}
              indexFormat={(value) => {
                return moment(value, "H").format("hh:mm A");
              }}
            />
          </InfoCard>
          <InfoCard title="Daily Visits">
            <Charts
              types={["bar", "line"]}
              isLoading={listingIsLoading}
              data={listing?.stats["Day of week"]}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visits",
                },
              }}
              LineSvgProps={{
                axisLeft: {
                  legend: "Visits",
                },
              }}
              indexFormat={(value) => {
                return moment((Number(value) + 1) % 7, "e").format("dddd");
              }}
            />
          </InfoCard>
          <InfoCard title="Visit Frequency">
            <Charts
              types={["bar", "line"]}
              isLoading={listingIsLoading}
              data={listing?.stats["Frequency"]}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visits",
                },
              }}
              LineSvgProps={{
                axisLeft: {
                  legend: "Visits",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Visitor type">
            <Charts
              types={["pie", "bar"]}
              isLoading={listingIsLoading}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visits",
                },
              }}
              LineSvgProps={{
                axisLeft: {
                  legend: "Visits",
                },
              }}
            />
          </InfoCard>
        </Stack>
      </Container>
    </Stack>
  );
};

Visits.getLayout = (page) => {
  return <PropertyLayout>{page}</PropertyLayout>;
};

export default Visits;
