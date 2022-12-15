import { FC, Fragment, useRef } from "react";
import { useAsync } from "react-use";

import { Box, IconButton, Stack, Unstable_Grid2 } from "@mui/material";

import ChevronLeft from "assets/icons/chevron-left.svg";
import ChevronRight from "assets/icons/chevron-right.svg";

const ImageCarousel: FC = () => {
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
    <>
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
    </>
  );
};

export default ImageCarousel;
