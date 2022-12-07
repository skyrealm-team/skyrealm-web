import { FC, PropsWithChildren } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from './theme';

const MuiProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiProvider;
