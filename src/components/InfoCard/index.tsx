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
    <Card elevation={0} square={false} {...CardProps}>
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
              p: 2,
              ...CardHeaderProps?.sx,
            }}
          />
          <Divider />
        </>
      )}
      <CardContent
        {...CardContentProps}
        sx={{
          p: 3,
          pt: 1.5,
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
