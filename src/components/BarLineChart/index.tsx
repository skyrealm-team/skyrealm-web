import React, { FC, useState } from "react";

import {
  Alert,
  AlertTitle,
  MenuItem,
  Paper,
  Stack,
  StackProps,
  Typography,
  useTheme,
} from "@mui/material";

import { BarDatum, BarSvgProps, ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine, LineSvgProps } from "@nivo/line";

import BarChartIcon from "assets/icons/bar-chart.svg";
import LineChartIcon from "assets/icons/line-chart.svg";
import SelectField from "components/SelectField";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

export type BarLineChartProps = {
  StackProps?: StackProps;
  data?: object;
  defaultType?: "bar" | "line";
  BarSvgProps?: Omit<BarSvgProps<BarDatum>, "data" | "height" | "width">;
  LineSvgProps?: Omit<LineSvgProps, "data" | "height" | "width">;
  indexFormat?: (indexValue?: string | number) => string;
};
const BarLineChart: FC<BarLineChartProps> = ({
  StackProps,
  data,
  defaultType = "bar",
  BarSvgProps,
  LineSvgProps,
  indexFormat,
}) => {
  const theme = useTheme();

  const [type, setType] = useState(defaultType);

  return (
    <Stack
      {...StackProps}
      sx={{
        width: "100%",
        height: "100%",
        aspectRatio: `${1240 / 468}`,
        ...StackProps?.sx,
      }}
    >
      {data ? (
        <>
          <Stack direction="row" alignItems="center" gap={4}>
            <Stack direction="row" alignItems="center">
              <Typography
                sx={{
                  color: "#999999",
                  fontSize: 14,
                }}
              >
                Chart Type
              </Typography>
              <SelectField
                value={type}
                onChange={(event) => {
                  setType(event.target.value as never);
                }}
                size="small"
                sx={{
                  fieldset: {
                    border: "none !important",
                  },
                  "&.Mui-focused": {
                    fieldset: {
                      border: "none !important",
                    },
                  },
                }}
              >
                <MenuItem value="bar">
                  <BarChartIcon />
                </MenuItem>
                <MenuItem value="line">
                  <LineChartIcon />
                </MenuItem>
              </SelectField>
            </Stack>
          </Stack>
          {type === "bar" && (
            <ResponsiveBar
              margin={{ top: 30, bottom: 30, left: 60, right: 30 }}
              padding={0.4}
              borderRadius={4}
              colors={theme.palette.primary.main}
              enableLabel={false}
              {...BarSvgProps}
              data={Object.entries(data ?? {}).map(([key, val]) => ({
                id: key,
                value: String(val),
              }))}
              valueFormat={(value) => {
                return formatter.format(value);
              }}
              axisLeft={{
                legendPosition: "middle",
                legendOffset: -50,
                ...(BarSvgProps?.layout !== "horizontal" && {
                  format: (value) => {
                    return formatter.format(Number(value));
                  },
                }),
                ...BarSvgProps?.axisLeft,
              }}
              axisBottom={{
                format: indexFormat,
                ...(BarSvgProps?.layout === "horizontal" && {
                  format: (value) => {
                    return formatter.format(Number(value));
                  },
                }),
                ...BarSvgProps?.axisBottom,
              }}
              tooltip={({ indexValue, formattedValue, color }) => {
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
                        {indexFormat ? indexFormat(indexValue) : indexValue}
                      </Typography>
                      <Typography
                        color={color}
                        sx={{
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        {formattedValue}
                      </Typography>
                    </Stack>
                  </Paper>
                );
              }}
            />
          )}
          {type === "line" && (
            <ResponsiveLine
              margin={{ top: 30, bottom: 30, left: 60, right: 30 }}
              colors={theme.palette.primary.main}
              useMesh={true}
              enablePoints={false}
              enableGridX={false}
              {...LineSvgProps}
              data={[
                {
                  id: Math.random(),
                  data: Object.entries(data ?? {}).map(([key, val]) => ({
                    x: key,
                    y: Number(val),
                  })),
                },
              ]}
              yFormat={(value) => {
                return formatter.format(Number(value));
              }}
              axisLeft={{
                legendPosition: "middle",
                legendOffset: -50,
                format: (value) => {
                  return formatter.format(Number(value));
                },
                ...LineSvgProps?.axisLeft,
              }}
              axisBottom={{
                format: indexFormat,
                ...LineSvgProps?.axisBottom,
              }}
              tooltip={({ point }) => {
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
                        {indexFormat
                          ? indexFormat(point.data.xFormatted)
                          : point.data.xFormatted}
                      </Typography>
                      <Typography
                        color={point.color}
                        sx={{
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        {point.data.yFormatted}
                      </Typography>
                    </Stack>
                  </Paper>
                );
              }}
            />
          )}
        </>
      ) : (
        <Alert severity="error">
          <AlertTitle>Data Unavailable</AlertTitle>
          We are unable to retrieve data at this time.
        </Alert>
      )}
    </Stack>
  );
};

export default BarLineChart;
