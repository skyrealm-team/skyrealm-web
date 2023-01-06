import { FC, useRef } from "react";

import { Box, IconButton, Stack, Unstable_Grid2 } from "@mui/material";

import ChevronLeft from "assets/icons/chevron-left.svg";
import ChevronRight from "assets/icons/chevron-right.svg";

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
        justifyContent="center"
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
      >
        {images?.map((image, index) => (
          <Unstable_Grid2
            key={index}
            xs={5}
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
        </>
      )}
    </Stack>
  );
};

export default ImageCarousel;
