import { useRef } from "react";
import { useAsync } from "react-use";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  Typography,
  Unstable_Grid2,
} from "@mui/material";

import ChevronLeft from "assets/icons/chevron-left.svg";
import ChevronRight from "assets/icons/chevron-right.svg";
import FavoriteIcon from "assets/icons/favorite.svg";
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
      <Card square elevation={0}>
        <CardContent
          sx={{
            px: 3,
            py: 1.2,
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
        </CardContent>
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
                    sx={{
                      height: 0,
                      paddingTop: `${(198 / 264) * 100}%`,
                      background: `url(${item.download_url}) center/cover no-repeat`,
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
      </Card>
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
          <Card
            elevation={0}
            sx={{
              borderRadius: 2.5,
            }}
          >
            <CardContent
              sx={{
                p: 3,
              }}
            >
              <Unstable_Grid2 container>
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
                  <Unstable_Grid2 key={index} container xs={12} lg={6}>
                    <Unstable_Grid2 xs={6}>
                      <Typography
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
            </CardContent>
          </Card>
          <Card
            elevation={0}
            sx={{
              borderRadius: 2.5,
            }}
          >
            <CardHeader
              title={
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Property overview
                </Typography>
              }
              sx={{
                p: 2,
              }}
            />
            <Divider />
            <CardContent
              sx={{
                p: 3,
                pt: 1.5,
              }}
            >
              <Typography
                sx={{
                  color: "#333333",
                }}
              >
                277 Park Avenue, situated between 47th and 48th streets, is an
                iconic New York City office building. Award-winning architect
                Bohlin Cywinski Jackson is remastering this iconic Emery Roth +
                Sons designed property with over $100 million invested in
                capital improvements. These renovations include an outdoor plaza
                with green space, an expanded Park Avenue entrance to the
                immersive lobby with 30-foot ceiling heights, state-of-the-art
                media walls with tenant branding and custom messaging, and
                destination dispatch elevators. Improvements to the building's
                infrastructure will offer the latest security and visitor access
                systems, a main chiller plant modernization, energy-efficient
                compressors with the latest technology control systems, extended
                HVAC hours, and an emergency generator covering all life safety
              </Typography>
            </CardContent>
          </Card>
          <Card
            elevation={0}
            sx={{
              borderRadius: 2.5,
            }}
          >
            <CardHeader
              title={
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  MAP
                </Typography>
              }
              sx={{
                p: 2,
              }}
            />
            <Divider />
            <CardContent
              sx={{
                p: 3,
                pt: 1.5,
              }}
            ></CardContent>
          </Card>
          <Card
            elevation={0}
            sx={{
              borderRadius: 2.5,
            }}
          >
            <CardHeader
              title={
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Broker inf
                </Typography>
              }
              sx={{
                p: 2,
              }}
            />
            <Divider />
            <CardContent
              sx={{
                p: 3,
                pt: 1.5,
              }}
            ></CardContent>
          </Card>
        </Stack>
        <Card
          elevation={0}
          sx={{
            width: 340,
            borderRadius: 2.5,
          }}
        >
          <CardContent>
            <Stack gap={3} alignItems="center">
              <Stack gap={1} alignItems="center">
                <Avatar
                  sx={{
                    width: 130,
                    height: 130,
                    borderRadius: 2.5,
                  }}
                ></Avatar>
                <Stack>
                  <Typography
                    paragraph
                    sx={{
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    Steve Johnson
                  </Typography>
                  <Typography>(754) 465-7291</Typography>
                </Stack>
              </Stack>
              <Button variant="contained">Contact</Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
};

PropertyInfo.getLayout = (page) => {
  return <ListingLayout>{page}</ListingLayout>;
};

export default PropertyInfo;
