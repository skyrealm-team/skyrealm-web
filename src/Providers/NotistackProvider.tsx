import { FC, PropsWithChildren } from "react";

import { SnackbarProvider, SnackbarProviderProps } from "notistack";

export type NotistackProviderProps = Partial<SnackbarProviderProps>;

const NotistackProvider: FC<PropsWithChildren<NotistackProviderProps>> = ({
  children,
  ...props
}) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      {...props}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
        ...props.anchorOrigin,
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default NotistackProvider;
