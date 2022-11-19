import React from 'react';
import { ThemeProvider } from '@mui/material';
import theme from 'shared/theme';
import Router from './Router';

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
