import React, { FC, Fragment } from "react";

import {
  Avatar,
  Divider,
  Stack,
  Typography,
  Unstable_Grid2,
} from "@mui/material";

import moment from "moment";

import TelIcon from "assets/icons/tel.svg";
import ContactButton from "components/ContactButton";
import InfoCard from "components/InfoCard";
import PropertyMap from "components/PropertyMap";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

export type PropertyInfoProps = {
  listing?: Maybe<SingleListing>;
};
const PropertyInfo: FC<PropertyInfoProps> = ({ listing }) => {
  return (
    <Stack
      gap={4}
      px={{
        flex: 1,
      }}
    >
      <InfoCard
        CardContentProps={{
          sx: {
            px: 3,
            pt: 2.6,
            pb: 2.2,
          },
        }}
      >
        <Unstable_Grid2 container spacing={4}>
          {[
            {
              key: "Size",
              value: `${formatter.format(listing?.size ?? 0)} SF`,
            },
            {
              key: "Ceiling",
              value: formatter.format(listing?.ceiling ?? 0),
            },
            {
              key: "Frontage",
              value: formatter.format(listing?.frontage ?? 0),
            },
            {
              key: "Asking rent",
              value: `${formatter.format(listing?.rentPrice ?? 0)} per ${
                listing?.rentUnit
              } per ${listing?.rentPeriod}`,
            },
            {
              key: "Possession",
              value: (() => {
                const possession = moment(listing?.possession ?? Date.now());

                return possession.isAfter(Date.now())
                  ? possession.format("YYYY-MM-DD")
                  : "Immediate";
              })(),
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
              <Unstable_Grid2 xs={5}>
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
              <Unstable_Grid2 xs={7}>
                <Typography
                  noWrap
                  sx={{
                    color: "#333333",
                    fontSize: 20,
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
      {listing?.overview && (
        <InfoCard title="Property overview">
          <Typography
            sx={{
              color: "#333333",
              lineHeight: "34px",
            }}
          >
            {listing?.overview}
          </Typography>
        </InfoCard>
      )}
      <InfoCard title="MAP">
        <PropertyMap
          listing={listing}
          mapContainerStyle={{
            aspectRatio: `${1177 / 550}`,
          }}
          center={{
            lat: Number(listing?.latitude),
            lng: Number(listing?.longitude),
          }}
          zoom={Math.log2((40000000 * 194) / 152.4 / 256 / 2)}
          MarkerProps={{
            position: {
              lat: Number(listing?.latitude),
              lng: Number(listing?.longitude),
            },
          }}
        />
      </InfoCard>
      {!!listing?.brokersInfo?.length && (
        <InfoCard title="Broker info">
          <Stack gap={4}>
            {listing?.brokersInfo?.map((broker, index, list) => (
              <Fragment key={index}>
                <Stack direction="row" gap={3}>
                  <Stack gap={1.7} alignItems="center">
                    <Avatar
                      src={broker?.avatar ?? undefined}
                      variant="rounded"
                      sx={{
                        width: 170,
                        height: 170,
                      }}
                    ></Avatar>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <TelIcon />
                      <Typography>{broker?.phone}</Typography>
                    </Stack>

                    <ContactButton size="small" />
                  </Stack>
                  <Stack>
                    <Typography
                      paragraph
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      {broker?.firstName} {broker?.lastName}
                    </Typography>
                    <Typography>{broker?.bio}</Typography>
                  </Stack>
                </Stack>
                {index < list.length - 1 && (
                  <Divider
                    sx={{
                      ml: 20,
                    }}
                  />
                )}
              </Fragment>
            ))}
          </Stack>
        </InfoCard>
      )}
    </Stack>
  );
};

export default PropertyInfo;
