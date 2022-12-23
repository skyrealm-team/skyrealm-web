import React, { FC } from "react";

import {
  Alert,
  AlertTitle,
  Paper,
  Stack,
  StackProps,
  Typography,
  useTheme,
} from "@mui/material";

import { ResponsivePie, PieSvgProps, DefaultRawDatum } from "@nivo/pie";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

export type PieChartProps = Omit<
  PieSvgProps<DefaultRawDatum>,
  "data" | "width" | "height"
> & {
  StackProps?: StackProps;
  data?: object;
};
const PieChart: FC<PieChartProps> = ({ StackProps, data, ...props }) => {
  const theme = useTheme();

  return (
    <Stack
      {...StackProps}
      sx={{
        width: "100%",
        height: "100%",
        aspectRatio: `${635 / 348}`,
        ...StackProps?.sx,
      }}
    >
      {data ? (
        <ResponsivePie
          colors={theme.palette.primary.main}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor="#FFF"
          {...props}
          data={Object.entries(data ?? {}).map(([key, val]) => ({
            id: key,
            value: Number(val),
          }))}
          valueFormat={(value) => {
            return formatter.format(value);
          }}
          tooltip={({ datum }) => {
            return (
              <Paper
                sx={{
                  p: 1.5,
                }}
              >
                <Stack direction="row" alignItems="center" gap={10}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    {datum.label}
                  </Typography>
                  <Typography
                    color={datum.color}
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {datum.formattedValue}
                  </Typography>
                </Stack>
              </Paper>
            );
          }}
        />
      ) : (
        <Alert severity="error">
          <AlertTitle>Data Unavailable</AlertTitle>
          We are unable to retrieve data at this time.
        </Alert>
      )}
    </Stack>
  );
};

export default PieChart;
