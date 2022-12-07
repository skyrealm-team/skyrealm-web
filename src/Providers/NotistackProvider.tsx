import { FC, PropsWithChildren } from "react";

import { SnackbarProvider } from "notistack";

export type NotistackProviderProps = {};

const NotistackProvider: FC<PropsWithChildren<NotistackProviderProps>> = ({
  children,
}) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default NotistackProvider;
