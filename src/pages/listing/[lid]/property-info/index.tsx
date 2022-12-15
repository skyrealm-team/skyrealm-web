import { Fragment, useRef } from "react";
import { useAsync } from "react-use";

import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  Unstable_Grid2,
} from "@mui/material";

import { GoogleMap } from "@react-google-maps/api";

import ChevronLeft from "assets/icons/chevron-left.svg";
import ChevronRight from "assets/icons/chevron-right.svg";
import ContactSmallIcon from "assets/icons/contact-small.svg";
import ContactIcon from "assets/icons/contact.svg";
import FavoriteIcon from "assets/icons/favorite.svg";
import TelIcon from "assets/icons/tel.svg";
import InfoCard from "components/InfoCard";
import ListingLayout from "layouts/ListingLayout";
import { NextPageWithLayout } from "pages/_app";

const PropertyInfo: NextPageWithLayout = () => {
  const images = useAsync(async () => {
    const response = await fetch("https://picsum.photos/v2/list");
    const result: {
      id: string;
      download_url: string;
    }[] = await response.json();
    return result;
  });

  const ref = useRef<HTMLDivElement>(null);

  return (
    <Stack>
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
              270 W 43rd St, New York, NY 100
            </Typography>
            <Typography
              sx={{
                color: "#999999",
              }}
            >
              Washington Square, New York, NY 10012
            </Typography>
          </Stack>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
        </Stack>
      </InfoCard>
      {images.value && (
        <Stack
          sx={{
            position: "relative",
          }}
        >
          <Unstable_Grid2
            ref={ref}
            container
            wrap="nowrap"
            sx={{
              overflowX: "auto",
              transform: "translateZ(0)",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {images.value?.map((item) => (
              <Unstable_Grid2
                key={item.id}
                xs={5}
                sx={{
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src={item.download_url}
                  alt=""
                  sx={{
                    width: "100%",
                    aspectRatio: `${264 / 198}`,
                    objectFit: "cover",
                    // height: 0,
                    // paddingTop: `${(198 / 264) * 100}%`,
                    // background: `url(${item.download_url}) center/cover no-repeat`,
                  }}
                />
              </Unstable_Grid2>
            ))}
          </Unstable_Grid2>
          <IconButton
            onClick={() => {
              ref.current?.scrollBy({
                behavior: "smooth",
                left: -ref.current?.clientWidth,
              });
            }}
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={() => {
              ref.current?.scrollBy({
                behavior: "smooth",
                left: ref.current?.clientWidth,
              });
            }}
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ChevronRight />
          </IconButton>
        </Stack>
      )}
      <Stack
        direction="row"
        alignItems="flex-start"
        gap={3}
        sx={{
          p: 3,
        }}
      >
        <Stack
          gap={3}
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
                  value: "48,591 SF",
                },
                {
                  key: "Ceiling",
                  value: "7.5M",
                },
                {
                  key: "Frontage",
                  value: "7.5M",
                },
                {
                  key: "Asking rent",
                  value: "7.5M",
                },
                {
                  key: "Possessio",
                  value: "7.5M",
                },
              ].map(({ key, value }, index) => (
                <Unstable_Grid2
                  key={index}
                  container
                  alignItems="center"
                  spacing={0}
                  xs={12}
                  lg={6}
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
          <InfoCard title="Property overview">
            <Typography
              sx={{
                color: "#333333",
                lineHeight: "34px",
              }}
            >
              277 Park Avenue, situated between 47th and 48th streets, is an
              iconic New York City office building. Award-winning architect
              Bohlin Cywinski Jackson is remastering this iconic Emery Roth +
              Sons designed property with over $100 million invested in capital
              improvements. These renovations include an outdoor plaza with
              green space, an expanded Park Avenue entrance to the immersive
              lobby with 30-foot ceiling heights, state-of-the-art media walls
              with tenant branding and custom messaging, and destination
              dispatch elevators. Improvements to the building's infrastructure
              will offer the latest security and visitor access systems, a main
              chiller plant modernization, energy-efficient compressors with the
              latest technology control systems, extended HVAC hours, and an
              emergency generator covering all life safety
            </Typography>
          </InfoCard>
          <InfoCard title="MAP">
            <GoogleMap
              center={{ lat: 40.7830603, lng: -73.9712488 }}
              zoom={12}
              mapContainerStyle={{
                aspectRatio: 1177 / 550,
              }}
              options={{
                mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
                minZoom: 2,
                clickableIcons: false,
                controlSize: 30,
                disableDefaultUI: false,
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                panControl: false,
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: true,
                gestureHandling: "none",
              }}
            />
          </InfoCard>
          <InfoCard title="Broker inf">
            <Stack gap={4}>
              {[
                {
                  name: "Mark Boisi, Executive Vice Chair",
                  tel: "(754) 465-7291",
                  info: "Mark Boisi has been active in commercial real estate in New York City since 1975 when he started his career with Cross & Brown Co. In 1978, he was a founding member of Abrams Benisch Riker Inc., which became Colliers ABR Inc., one of the predecessor companies to Cassidy Turley. Over his 35-year career, Mark’s primary focus has been on corporate and institutional real estate, principally in tenant representation, property management, and leasing assignments. He has coordinated real estate projects on behalf of dozens of corporate users and owners. He was the co-head of Cassidy Turley's $400 million joint venture investment fund with AEW Capital, which invested in commercial property in the New York metropolitan area.",
                },
                {
                  name: "Mark Boisi, Executive Vice Chair",
                  tel: "(754) 465-7291",
                  info: "Mark Boisi has been active in commercial real estate in New York City since 1975 when he started his career with Cross & Brown Co. In 1978, he was a founding member of Abrams Benisch Riker Inc., which became Colliers ABR Inc., one of the predecessor companies to Cassidy Turley. Over his 35-year career, Mark’s primary focus has been on corporate and institutional real estate, principally in tenant representation, property management, and leasing assignments. He has coordinated real estate projects on behalf of dozens of corporate users and owners. He was the co-head of Cassidy Turley's $400 million joint venture investment fund with AEW Capital, which invested in commercial property in the New York metropolitan area.",
                },
              ].map(({ name, tel, info }, index, list) => (
                <Fragment key={index}>
                  <Stack direction="row" gap={3}>
                    <Stack gap={1.7} alignItems="center">
                      <Avatar
                        sx={{
                          width: 170,
                          height: 170,
                          borderRadius: 2.5,
                        }}
                      ></Avatar>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <TelIcon />
                        <Typography>{tel}</Typography>
                      </Stack>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<ContactSmallIcon />}
                        sx={{
                          fontSize: 18,
                          fontWeight: 700,
                          width: 120,
                          height: 40,
                        }}
                      >
                        Contact
                      </Button>
                    </Stack>
                    <Stack>
                      <Typography
                        paragraph
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {name}
                      </Typography>
                      <Typography>{info}</Typography>
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
        </Stack>
        <InfoCard
          CardContentProps={{
            sx: {
              px: 7.5,
              py: 3.2,
            },
          }}
        >
          <Stack gap={3} alignItems="center">
            <Stack gap={1} alignItems="center">
              <Avatar
                sx={{
                  width: 130,
                  height: 130,
                  borderRadius: 2.5,
                }}
              ></Avatar>
              <Stack alignItems="center">
                <Typography
                  paragraph
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  Steve Johnson
                </Typography>
                <Stack direction="row" alignItems="center" gap={1}>
                  <TelIcon />
                  <Typography>(754) 465-7291</Typography>
                </Stack>
              </Stack>
            </Stack>
            <Button
              variant="contained"
              size="small"
              startIcon={<ContactIcon />}
              sx={{
                fontSize: 18,
                fontWeight: 700,
                width: 190,
                height: 50,
              }}
            >
              Contact
            </Button>
          </Stack>
        </InfoCard>
      </Stack>
    </Stack>
  );
};

PropertyInfo.getLayout = (page) => {
  return <ListingLayout>{page}</ListingLayout>;
};

export default PropertyInfo;
