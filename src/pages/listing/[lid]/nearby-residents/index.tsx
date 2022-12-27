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
          <Stack direction="row" gap={3}>
            <InfoCard
              title="Gender"
              CardProps={{
                sx: { flex: 1 },
              }}
            >
              <Charts
                defaultType="pie"
                types={["bar", "pie"]}
                isLoading={listingIsLoading}
                data={Object.entries(listing?.stats["Sex"] ?? {}).map(
                  ([id, value]) => ({
                    id,
                    value: Number(value),
                  })
                )}
                StackProps={{
                  sx: {
                    aspectRatio: `${635 / 348}`,
                  },
                }}
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
                types={["bar"]}
                isLoading={listingIsLoading}
                data={Object.entries(listing?.stats["Age"] ?? {}).map(
                  ([id, value]) => ({
                    id,
                    value: Number(value),
                  })
                )}
                StackProps={{
                  sx: {
                    aspectRatio: `${635 / 348}`,
                  },
                }}
                BarSvgProps={{
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
              types={["bar"]}
              isLoading={listingIsLoading}
              data={Object.entries(
                listing?.stats["Recoded detailed race code"] ?? {}
              ).map(([id, value]) => ({
                id,
                value: Number(value),
              }))}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Household Income">
            <Charts
              types={["bar"]}
              isLoading={listingIsLoading}
              data={Object.entries(
                listing?.stats[
                  "Household income (past 12 months, use ADJINC to adjust HINCP to constant dollars)"
                ] ?? {}
              ).map(([id, value]) => ({
                id,
                value: Number(value),
              }))}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Education">
            <Charts
              types={["bar"]}
              isLoading={listingIsLoading}
              data={[
                {
                  id: "Grade",
                  ...Object.entries(
                    listing?.stats["Educational attainment"] ?? {}
                  )
                    .filter(([id]) => id.toLowerCase().includes("grade"))
                    .reduce(
                      (acc, [id, value]) => ({ ...acc, [id]: value }),
                      {}
                    ),
                },
                ...Object.entries(
                  listing?.stats["Educational attainment"] ?? {}
                )
                  .filter(([id]) => !id.toLowerCase().includes("grade"))
                  .map(([id, value]) => ({
                    id,
                    value: Number(value),
                  })),
              ]}
              BarSvgProps={{
                keys: [
                  "value",
                  ...Object.keys(
                    listing?.stats["Educational attainment"]
                  ).filter((item) => item.toLowerCase().includes("grade")),
                ],
                axisLeft: {
                  legend: "Visitors",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Employment Status">
            <Charts
              types={["bar"]}
              isLoading={listingIsLoading}
              data={Object.entries(
                listing?.stats["Employment status recode"] ?? {}
              ).map(([id, value]) => ({
                id,
                value: Number(value),
              }))}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Occupation">
            <Charts
              types={["bar"]}
              isLoading={listingIsLoading}
              data={Object.entries(
                listing?.stats[
                  "Standard Occupational Classification (SOC) codes for 2018 and later based on 2018 SOC codes"
                ] ?? {}
              ).map(([id, value]) => ({
                id,
                value: Number(value),
              }))}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Transportation to work">
            <Charts
              types={["bar"]}
              isLoading={listingIsLoading}
              data={Object.entries(
                listing?.stats["Means of transportation to work"] ?? {}
              ).map(([id, value]) => ({
                id,
                value: Number(value),
              }))}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Travel time to work">
            <Charts
              types={["bar"]}
              isLoading={listingIsLoading}
              data={Object.entries(
                listing?.stats["Travel time to work"] ?? {}
              ).map(([id, value]) => ({
                id,
                value: Number(value),
              }))}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Family size">
            <Charts
              types={["bar"]}
              isLoading={listingIsLoading}
              data={Object.entries(
                listing?.stats["Number of persons in family (unweighted)"] ?? {}
              ).map(([id, value]) => ({
                id,
                value: Number(value),
              }))}
              BarSvgProps={{
                axisLeft: {
                  legend: "Visitors",
                },
              }}
            />
          </InfoCard>
          <InfoCard title="Marital Status">
            <Charts
              types={["bar"]}
              isLoading={listingIsLoading}
              data={Object.entries(listing?.stats["Marital status"] ?? {}).map(
                ([id, value]) => ({
                  id,
                  value: Number(value),
                })
              )}
              BarSvgProps={{
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
