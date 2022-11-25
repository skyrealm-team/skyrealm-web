import React from 'react';
import { ThemeProvider } from '@mui/material';
import theme from 'shared/theme';
import { RootStoresProvider, rootStore } from 'stores/index';
import { ApolloProvider } from '@apollo/client';
import client from 'graphql/client';
import Nav from './Nav';
import Router from './Router';
import 'reset-css';
import './style/index.scss';

function App() {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <RootStoresProvider value={rootStore}>
            <Nav />
            <Router />
          </RootStoresProvider>
        </ThemeProvider>
      </ApolloProvider>
    </React.StrictMode>
  );
}

export default App;
