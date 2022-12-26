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

const Charts = dynamic(() => import("components/Charts"), {
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

const NearbyResidents: NextPageWithLayout = () => {
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
              <Charts
                defaultType="pie"
                data={listing?.stats["Sex"]}
                PieSvgProps={{
                  colors: ["#208AFF", "#ED6AB5"],
                }}
              />
            </InfoCard>
            <InfoCard
              title="Age"
              CardProps={{
                sx: { flex: 1 },
              }}
            >
              <Charts
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
                indexFormat={(value) => {
                  return String(value).split(":").join(" : ");
                }}
              />
            </InfoCard>
          </Stack>
          <InfoCard title="Race and Ethnicity">
            <Charts
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
            <Charts
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
            <Charts
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
            <Charts
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
            <Charts
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
            <Charts
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
            <Charts
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
            <Charts
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
          <InfoCard title="Marital Status">
            <Charts
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

NearbyResidents.getLayout = (page) => {
  return <PropertyLayout>{page}</PropertyLayout>;
};

export default NearbyResidents;
