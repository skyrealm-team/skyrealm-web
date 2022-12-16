import {
  Container,
  Stack,
  Typography,
  Unstable_Grid2,
  useTheme,
} from "@mui/material";

import { ResponsiveBar } from "@nivo/bar";

import InfoCard from "components/InfoCard";
import PropertyHeader from "components/PropertyHeader";
import PropertyMap from "components/PropertyMap";
import ListingLayout from "layouts/ListingLayout";
import { NextPageWithLayout } from "pages/_app";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

const Visits: NextPageWithLayout = () => {
  const theme = useTheme();

  return (
    <Stack>
      <PropertyHeader />
      <PropertyMap
        mapContainerStyle={{
          aspectRatio: 1667 / 410,
        }}
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
                  value: "7.5M",
                },
                {
                  key: "Visit Frequency",
                  value: "3.72",
                },
                {
                  key: "Visitors",
                  value: "952.4K",
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
          <InfoCard
            title="Visits Trend"
            CardContentProps={{
              sx: {
                height: 468,
              },
            }}
          >
            <ResponsiveBar
              data={[
                {
                  date: "Sep 26",
                  visits: 678 * 1000,
                },
                {
                  date: "Oct 03",
                  visits: 789 * 1000,
                },
                {
                  date: "Oct 10",
                  visits: 890 * 1000,
                },
                {
                  date: "Oct 17",
                  visits: 567 * 1000,
                },
                {
                  date: "Oct 24",
                  visits: 678 * 1000,
                },
              ]}
              keys={["visits"]}
              indexBy="date"
              margin={{ bottom: 20, left: 100 }}
              padding={0.4}
              borderRadius={4}
              colors={theme.palette.primary.main}
              axisLeft={{
                legend: "Visits",
                legendPosition: "start",
                legendOffset: -80,
                format: (value) => formatter.format(Number(value)),
              }}
              enableLabel={false}
              valueFormat={(value) => formatter.format(value)}
            />
          </InfoCard>
          <InfoCard title="Visits Trend"></InfoCard>
          <InfoCard title="Daily Visits"></InfoCard>
          <InfoCard title="Frequency"></InfoCard>
          <InfoCard title="Visitor type"></InfoCard>
        </Stack>
      </Container>
    </Stack>
  );
};

Visits.getLayout = (page) => {
  return <ListingLayout>{page}</ListingLayout>;
};

export default Visits;
