import { FC } from "react";

import dynamic from "next/dynamic";

import { Alert, Stack } from "@mui/material";

import InfoCard from "components/InfoCard";

const Charts = dynamic(() => import("components/Charts"), {
  ssr: false,
});

export type PropertyVisitorProps = {
  listing?: Maybe<SingleListing>;
  isLoading?: boolean;
};
const PropertyVisitor: FC<PropertyVisitorProps> = ({ listing, isLoading }) => {
  return (
    <Stack gap={4}>
      <Alert severity="info">
        Data range: {listing?.stats["timeStart"]} - {listing?.stats["timeEnd"]}
      </Alert>
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
            isLoading={isLoading}
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
            isLoading={isLoading}
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
          isLoading={isLoading}
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
          isLoading={isLoading}
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
          isLoading={isLoading}
          data={[
            {
              id: "Grade",
              ...Object.entries(listing?.stats["Educational attainment"] ?? {})
                .filter(([id]) => id.toLowerCase().includes("grade"))
                .reduce((acc, [id, value]) => ({ ...acc, [id]: value }), {}),
            },
            ...Object.entries(listing?.stats["Educational attainment"] ?? {})
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
                listing?.stats["Educational attainment"] ?? {}
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
          isLoading={isLoading}
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
          isLoading={isLoading}
          data={Object.entries(
            listing?.stats[
              "Standard Occupational Classification (SOC) codes for 2018 and later based on 2018 SOC codes"
            ] ?? {}
          )
            .map(([id, value]) => ({
              id,
              value: Number(value),
            }))
            .sort((a, b) => a.value - b.value)}
          StackProps={{
            sx: {
              aspectRatio: `${1240 / 468 / 2}`,
            },
          }}
          BarSvgProps={{
            layout: "horizontal",
            margin: {
              right: 500,
            },
            axisLeft: {
              format: () => "",
            },
            axisRight: {
              tickSize: 0,
            },
          }}
        />
      </InfoCard>
      <InfoCard title="Transportation to work">
        <Charts
          types={["bar"]}
          isLoading={isLoading}
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
          isLoading={isLoading}
          data={Object.entries(listing?.stats["Travel time to work"] ?? {}).map(
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
      <InfoCard title="Family size">
        <Charts
          types={["bar"]}
          isLoading={isLoading}
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
          isLoading={isLoading}
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
  );
};

export default PropertyVisitor;
