import React from 'react';
import { ThemeProvider } from '@mui/material';
import theme from 'shared/theme';
import { RootStoresProvider, rootStore } from 'stores/index';
import Nav from './Nav';
import Router from './Router';
import 'reset-css';
import './style/index.scss';

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RootStoresProvider value={rootStore}>
          <Nav />
          <Router />
        </RootStoresProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
