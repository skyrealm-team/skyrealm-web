import { FC, useRef } from "react";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { alpha, Box, IconButton, Stack, Unstable_Grid2 } from "@mui/material";

export type ImageCarouselProps = {
  images?: Maybe<string>[];
};
const ImageCarousel: FC<ImageCarouselProps> = ({ images }) => {
  const ref = useRef<HTMLDivElement>(null);

  if (!images?.length) {
    return null;
  }

  return (
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
          overflowY: "hidden",
          transform: "translateZ(0)",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        {...(images.length < 3 && {
          justifyContent: "center",
        })}
      >
        {images?.map((image, index) => (
          <Unstable_Grid2
            key={index}
            xs={8}
            sm={5}
            sx={{
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={image ?? ""}
              alt=""
              sx={{
                width: "100%",
                height: "100%",
                aspectRatio: `${264 / 198}`,
                objectFit: "cover",
              }}
            />
          </Unstable_Grid2>
        ))}
      </Unstable_Grid2>
      {images.length >= 3 && (
        <>
          <IconButton
            onClick={() => {
              ref.current?.scrollBy({
                behavior: "smooth",
                left: -ref.current?.clientWidth,
              });
            }}
            disableRipple
            sx={(theme) => ({
              color: "white",
              background: alpha("#000", 0.5),
              position: "absolute",
              left: theme.spacing(1),
              top: "50%",
              transform: "translateY(-50%)",
            })}
          >
            <ChevronLeft
              sx={{
                fontSize: {
                  sm: 60,
                },
              }}
            />
          </IconButton>
          <IconButton
            onClick={() => {
              ref.current?.scrollBy({
                behavior: "smooth",
                left: ref.current?.clientWidth,
              });
            }}
            disableRipple
            sx={(theme) => ({
              color: "white",
              background: alpha("#000", 0.5),
              position: "absolute",
              right: theme.spacing(1),
              top: "50%",
              transform: "translateY(-50%)",
            })}
          >
            <ChevronRight
              sx={{
                fontSize: {
                  sm: 60,
                },
              }}
            />
          </IconButton>
        </>
      )}
    </Stack>
  );
};

export default ImageCarousel;
