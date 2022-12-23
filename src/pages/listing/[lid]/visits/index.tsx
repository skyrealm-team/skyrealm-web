import { useRouter } from "next/router";

import {
  Container,
  LinearProgress,
  Stack,
  Typography,
  Unstable_Grid2,
} from "@mui/material";

import moment from "moment";

import ChartCard from "components/ChartCard";
import InfoCard from "components/InfoCard";
import PropertyHeader from "components/PropertyHeader";
import PropertyMap from "components/PropertyMap";
import useQueryListing from "graphql/useQueryListing";
import PropertyLayout from "layouts/PropertyLayout";
import { NextPageWithLayout } from "pages/_app";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

const Visits: NextPageWithLayout = () => {
  const router = useRouter();
  const { lid } = router.query;

  const { data: listing, isLoading: listingIsLoading } = useQueryListing({
    listingId: lid && String(lid),
  });

  return (
    <>
      {listingIsLoading ? (
        <LinearProgress />
      ) : (
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
              {/* <ChartCard
              InfoCardProps={{
                title: "Visits Trend",
              }}
            /> */}
              <ChartCard
                InfoCardProps={{
                  title: "Hourly Visits",
                }}
                data={listing?.stats["Time of day"]}
                BarSvgProps={{
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
              <ChartCard
                InfoCardProps={{
                  title: "Daily Visits",
                }}
                data={listing?.stats["Day of week"]}
                LineSvgProps={{
                  axisLeft: {
                    legend: "Visits",
                  },
                }}
                indexFormat={(value) => {
                  return moment((Number(value) + 1) % 7, "e").format("dddd");
                }}
              />
              <ChartCard
                InfoCardProps={{
                  title: "Visit Frequency",
                }}
                data={listing?.stats["Frequency"]}
                LineSvgProps={{
                  axisLeft: {
                    legend: "Visits",
                  },
                }}
              />
              {/* <ChartCard
              InfoCardProps={{
                title: "Visitor type",
              }}
            /> */}
            </Stack>
          </Container>
        </Stack>
      )}
    </>
  );
};

Visits.getLayout = (page) => {
  return <PropertyLayout>{page}</PropertyLayout>;
};

export default Visits;
