import { dehydrate, QueryClient } from "react-query";

import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { Container, Stack } from "@mui/material";

import InfoCard from "components/InfoCard";
import PropertyHeader from "components/PropertyHeader";
import PropertyMap from "components/PropertyMap";
import useQueryListingById, {
  queryListingByIdRequest,
} from "graphql/useQueryListingById";
import PropertyLayout from "layouts/PropertyLayout";
import { NextPageWithLayout } from "pages/_app";

const BarLineChart = dynamic(() => import("components/BarLineChart"), {
  ssr: false,
});
const PieChart = dynamic(() => import("components/PieChart"), {
  ssr: false,
});

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

const VisitorProfile: NextPageWithLayout = () => {
  const router = useRouter();
  const { lid } = router.query;

  const { data: listing } = useQueryListingById({
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
          <Stack direction="row" gap={3}>
            <InfoCard
              title="Gender"
              CardProps={{
                sx: { flex: 1 },
              }}
            >
              <PieChart
                data={listing?.stats["Sex"]}
                colors={["#208AFF", "#ED6AB5"]}
                arcLinkLabelsColor={(d) => {
                  return d.color;
                }}
              />
            </InfoCard>
            <InfoCard
              title="Age"
              CardProps={{
                sx: { flex: 1 },
              }}
            >
              <BarLineChart
                StackProps={{
                  sx: {
                    aspectRatio: `${635 / 348}`,
                  },
                }}
                data={listing?.stats["Age"]}
                BarSvgProps={{
                  axisLeft: {
                    legend: "Visitors",
                  },
                }}
                LineSvgProps={{
                  axisLeft: {
                    legend: "Visitors",
                  },
                }}
              />
            </InfoCard>
          </Stack>
          <InfoCard title="Race and Ethnicity">
            <BarLineChart
              data={listing?.stats["Recoded detailed race code"]}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
              LineSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Household Income">
            <BarLineChart
              data={
                listing?.stats[
                  "Household income (past 12 months, use ADJINC to adjust HINCP to constant dollars)"
                ]
              }
              BarSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
              LineSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Education">
            <BarLineChart
              data={listing?.stats["Educational attainment"]}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
              LineSvgProps={{
                axisLeft: {
                  legend: "Visits",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Employment Status">
            <BarLineChart
              data={listing?.stats["Employment status recode"]}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
              LineSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Occupation">
            <BarLineChart
              data={
                listing?.stats[
                  "Standard Occupational Classification (SOC) codes for 2018 and later based on 2018 SOC codes"
                ]
              }
              BarSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
              LineSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Transportation to work">
            <BarLineChart
              data={listing?.stats["Means of transportation to work"]}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
              LineSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Travel time to work">
            <BarLineChart
              data={listing?.stats["Travel time to work"]}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
              LineSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Family size">
            <BarLineChart
              data={listing?.stats["Number of persons in family (unweighted)"]}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
              LineSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Family size">
            <BarLineChart
              data={listing?.stats["Marital status"]}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
              LineSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
            />
          </InfoCard>
        </Stack>
      </Container>
    </Stack>
  );
};

VisitorProfile.getLayout = (page) => {
  return <PropertyLayout>{page}</PropertyLayout>;
};

export default VisitorProfile;
