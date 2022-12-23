import { FC } from "react";

import { Stack, Typography } from "@mui/material";

import LocationIcon from "assets/icons/location.svg";
import FavoriteButton from "components/FavoriteButton";
import InfoCard from "components/InfoCard";

export type PropertyHeaderProps = {
  listing?: Maybe<SingleListing>;
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
        <FavoriteButton listing={listing} />
      </Stack>
    </InfoCard>
  );
};

export default PropertyHeader;
