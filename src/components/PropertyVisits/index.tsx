import { FC } from "react";

import { Alert, Stack, Typography, Unstable_Grid2 } from "@mui/material";

import moment from "moment";

import Charts from "components/Charts";
import InfoCard from "components/InfoCard";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

export type PropertyVisitsProps = {
  listing?: Maybe<SingleListing>;
  isLoading?: boolean;
};
const PropertyVisits: FC<PropertyVisitsProps> = ({ listing, isLoading }) => {
  return (
    <Stack gap={4}>
      <Alert severity="info">
        Data range: {listing?.stats["timeStart"]} - {listing?.stats["timeEnd"]}
      </Alert>
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
          defaultType="line"
          types={["bar", "line"]}
          isLoading={isLoading}
          data={Object.entries(listing?.stats["Visits Trend"] ?? {}).map(
            ([id, value]) => ({
              id,
              value: Number(value),
            })
          )}
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
            return moment(value, "YYYY-MM-DD").format("MMM D");
          }}
        />
      </InfoCard>
      <InfoCard title="Hourly Visits">
        <Charts
          types={["bar", "line"]}
          isLoading={isLoading}
          data={Object.entries(listing?.stats["Time of day"] ?? {}).map(
            ([id, value]) => ({
              id,
              value: Number(value),
            })
          )}
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
            return moment(value, "H").format("hh:mm A");
          }}
        />
      </InfoCard>
      <InfoCard title="Daily Visits">
        <Charts
          types={["bar", "line"]}
          isLoading={isLoading}
          data={Object.entries(listing?.stats["Day of week"] ?? {}).map(
            ([id, value]) => ({
              id,
              value: Number(value),
            })
          )}
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
          isLoading={isLoading}
          data={Object.entries(listing?.stats["Frequency"] ?? {}).map(
            ([id, value]) => ({
              id,
              value: Number(value),
            })
          )}
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
          defaultType="pie"
          types={["bar", "pie"]}
          isLoading={isLoading}
          data={Object.entries(listing?.stats["Visitors Type"] ?? {}).map(
            ([id, value]) => ({
              id,
              value: Number(value),
            })
          )}
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
  );
};

export default PropertyVisits;
