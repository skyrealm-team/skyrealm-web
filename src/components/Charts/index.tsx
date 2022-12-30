import React, { FC, useState } from "react";

import { PieChartOutline } from "@mui/icons-material";
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
import { DefaultRawDatum, PieSvgProps, ResponsivePie } from "@nivo/pie";
import uniqolor from "uniqolor";

import BarChartIcon from "assets/icons/bar-chart.svg";
import LineChartIcon from "assets/icons/line-chart.svg";
import SelectField from "components/SelectField";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

type ChartType = "bar" | "line" | "pie";

export type ChartsProps = {
  isLoading?: boolean;
  data?: Record<string, string | number>[];
  defaultType?: ChartType;
  types?: ChartType[];
  StackProps?: StackProps;
  BarSvgProps?: Omit<BarSvgProps<BarDatum>, "data" | "width" | "height">;
  LineSvgProps?: Omit<LineSvgProps, "data" | "width" | "height">;
  PieSvgProps?: Omit<PieSvgProps<DefaultRawDatum>, "data" | "width" | "height">;
  indexFormat?: (indexValue?: string | number) => string;
};
const Charts: FC<ChartsProps> = ({
  isLoading,
  data,
  defaultType = "bar",
  types = ["bar", "line", "bar"],
  StackProps,
  BarSvgProps,
  LineSvgProps,
  PieSvgProps,
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
      {data && (
        <>
          {types.length > 1 && (
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
                  {types.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item === "bar" && <BarChartIcon />}
                      {item === "line" && <LineChartIcon />}
                      {item === "pie" && (
                        <PieChartOutline
                          sx={{
                            color: "#999999",
                          }}
                        />
                      )}
                    </MenuItem>
                  ))}
                </SelectField>
              </Stack>
            </Stack>
          )}
          {type === "bar" && (
            <ResponsiveBar
              padding={0.4}
              colors={(d) => {
                return d.id === "value"
                  ? theme.palette.primary.main
                  : uniqolor(d.id).color;
              }}
              enableLabel={false}
              {...BarSvgProps}
              margin={{
                top: 20,
                bottom: 60,
                left: 60,
                right: 20,
                ...BarSvgProps?.margin,
              }}
              data={data}
              valueFormat={(value) => {
                return formatter.format(value);
              }}
              axisLeft={{
                tickSize: 0,
                legendPosition: "middle",
                legendOffset: -50,
                ...(BarSvgProps?.layout === "horizontal"
                  ? {
                      format: indexFormat,
                    }
                  : {
                      format: (value) => {
                        return formatter.format(Number(value));
                      },
                    }),
                ...BarSvgProps?.axisLeft,
              }}
              axisBottom={{
                ...(BarSvgProps?.layout === "horizontal"
                  ? {
                      format: (value) => {
                        return formatter.format(Number(value));
                      },
                    }
                  : {
                      format: indexFormat,
                      renderTick: ({
                        opacity,
                        textAnchor,
                        textBaseline,
                        textX,
                        textY,
                        value,
                        x,
                        y,
                      }) => {
                        const values = String(
                          indexFormat ? indexFormat(value) : value
                        )
                          .split(" ")
                          .filter(Boolean);
                        return (
                          <g
                            transform={`translate(${x},${y})`}
                            style={{ opacity }}
                          >
                            <line
                              x1={0}
                              x2={0}
                              y1={0}
                              y2={5}
                              style={{
                                stroke: "rgb(119, 119, 119)",
                                strokeWidth: 1,
                              }}
                            />
                            <text
                              alignmentBaseline={textBaseline as never}
                              textAnchor={textAnchor}
                              transform={`translate(${textX},${textY})`}
                              fontSize={10}
                            >
                              {(values.length <= 4
                                ? values
                                : [...values.slice(0, 3), "..."]
                              ).map((item, index) => (
                                <tspan key={index} x={0} y={(index + 1) * 10}>
                                  {item}
                                </tspan>
                              ))}
                            </text>
                          </g>
                        );
                      },
                    }),
                ...BarSvgProps?.axisBottom,
              }}
              tooltip={({ formattedValue, color, id, indexValue }) => {
                const index = id === "value" ? indexValue : id;

                return (
                  <Paper
                    sx={{
                      p: 1.5,
                    }}
                  >
                    <Typography
                      color={color}
                      sx={{
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      {formattedValue}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {indexFormat ? indexFormat(index) : index}
                    </Typography>
                  </Paper>
                );
              }}
            />
          )}
          {type === "line" && (
            <ResponsiveLine
              colors={theme.palette.primary.main}
              useMesh={true}
              enablePoints={false}
              enableGridX={false}
              yScale={{
                type: "linear",
                min: "auto",
              }}
              {...LineSvgProps}
              margin={{
                top: 20,
                bottom: 60,
                left: 60,
                right: 20,
                ...LineSvgProps?.margin,
              }}
              data={[
                {
                  id: Math.random(),
                  data: data.map(({ id, value, ...item }) => ({
                    x: id,
                    y: Number(value),
                    ...item,
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
                renderTick: ({
                  opacity,
                  textAnchor,
                  textBaseline,
                  textX,
                  textY,
                  value,
                  x,
                  y,
                }) => {
                  const values = String(
                    indexFormat ? indexFormat(value) : value
                  )
                    .split(" ")
                    .filter(Boolean);
                  return (
                    <g transform={`translate(${x},${y})`} style={{ opacity }}>
                      <line
                        x1={0}
                        x2={0}
                        y1={0}
                        y2={5}
                        style={{
                          stroke: "rgb(119, 119, 119)",
                          strokeWidth: 1,
                        }}
                      />
                      <text
                        alignmentBaseline={textBaseline as never}
                        textAnchor={textAnchor}
                        transform={`translate(${textX},${textY})`}
                        fontSize={10}
                      >
                        {(values.length <= 4
                          ? values
                          : [...values.slice(0, 3), "..."]
                        ).map((item, index) => (
                          <tspan key={index} x={0} y={(index + 1) * 10}>
                            {item}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  );
                },
                ...LineSvgProps?.axisBottom,
              }}
              tooltip={({ point }) => {
                return (
                  <Paper
                    sx={{
                      p: 1.5,
                    }}
                  >
                    <Typography
                      color={point.color}
                      sx={{
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      {point.data.yFormatted}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {indexFormat
                        ? indexFormat(point.data.xFormatted)
                        : point.data.xFormatted}
                    </Typography>
                  </Paper>
                );
              }}
            />
          )}
          {type === "pie" && (
            <ResponsivePie
              colors={data.map(({ id }) => uniqolor(id).color)}
              margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLabelsTextColor="#FFF"
              arcLinkLabelsColor={(d) => {
                return d.color;
              }}
              {...PieSvgProps}
              data={data.map(({ id, value, ...item }) => ({
                id,
                value: Number(value),
                ...item,
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
          )}
        </>
      )}
      {!isLoading && !data && (
        <Alert severity="error">
          <AlertTitle>Data Unavailable</AlertTitle>
          We are unable to retrieve data at this time.
        </Alert>
      )}
    </Stack>
  );
};

export default Charts;
