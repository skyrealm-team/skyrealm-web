import { FC } from "react";

import { IconButton, Stack, Typography } from "@mui/material";

import FavoriteIcon from "assets/icons/favorite.svg";
import LocationIcon from "assets/icons/location.svg";
import InfoCard from "components/InfoCard";

export type PropertyHeaderProps = {
  listing?: SingleListing;
};
const PropertyHeader: FC<PropertyHeaderProps> = ({ listing }) => {
  return (
    <InfoCard
      CardProps={{
        square: true,
      }}
      CardContentProps={{
        sx: {
          px: 3,
          py: 1.2,
        },
      }}
    >
      <Stack direction="row" alignItems="center" gap={3}>
        <Stack
          gap={1}
          sx={{
            flex: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {listing?.address}
          </Typography>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <LocationIcon />
            <Typography
              sx={{
                color: "#999999",
              }}
            >
              {listing?.address}
            </Typography>
          </Stack>
        </Stack>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
      </Stack>
    </InfoCard>
  );
};

export default PropertyHeader;
