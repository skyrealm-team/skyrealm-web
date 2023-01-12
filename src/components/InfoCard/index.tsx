import { FC, PropsWithChildren } from "react";

import {
  Box,
  Card,
  CardContent,
  CardContentProps,
  CardHeader,
  CardHeaderProps,
  CardProps,
  Divider,
  Typography,
} from "@mui/material";

export type InfoCardProps = {
  title?: string;
  CardProps?: CardProps;
  CardHeaderProps?: CardHeaderProps;
  CardContentProps?: CardContentProps;
};
const InfoCard: FC<PropsWithChildren<InfoCardProps>> = ({
  title,
  children,
  CardProps,
  CardHeaderProps,
  CardContentProps,
}) => {
  return (
    <Card
      elevation={0}
      square={false}
      {...CardProps}
      sx={{
        ...CardProps?.sx,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {title && (
        <>
          <CardHeader
            title={
              <Typography
                sx={{
                  fontWeight: 700,
                }}
              >
                {title}
              </Typography>
            }
            {...CardHeaderProps}
            sx={{
              p: {
                sm: 2,
              },
              ...CardHeaderProps?.sx,
            }}
          />
          <Divider />
        </>
      )}
      <CardContent
        {...CardContentProps}
        sx={{
          flex: 1,
          p: {
            sm: 3,
          },
          pt: {
            sm: 1.5,
          },
          ...CardContentProps?.sx,
        }}
      >
        {children}
      </CardContent>
      <Box />
    </Card>
  );
};

export default InfoCard;
