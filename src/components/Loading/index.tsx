import { FC } from "react";

import { Backdrop, CircularProgress } from "@mui/material";

const Loading: FC = () => {
  return (
    <Backdrop open={true} invisible>
      <CircularProgress />
    </Backdrop>
  );
};

export default Loading;
