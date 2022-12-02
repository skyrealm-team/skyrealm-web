import React, { FC, PropsWithChildren } from 'react';
import { SnackbarProvider } from 'notistack';

const NotistackProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default NotistackProvider;
