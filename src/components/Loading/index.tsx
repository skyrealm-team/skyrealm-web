import { FC } from "react";

import { Backdrop, BackdropProps, CircularProgress } from "@mui/material";

import { Optional } from "utility-types";

export type LoadingProps = Optional<BackdropProps, "open">;
const Loading: FC<LoadingProps> = ({ ...props }) => {
  return (
    <Backdrop open={true} {...props}>
      <CircularProgress />
    </Backdrop>
  );
};

export default Loading;
