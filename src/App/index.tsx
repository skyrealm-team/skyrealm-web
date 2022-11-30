import React from 'react';
import { ThemeProvider } from '@mui/material';
import theme from 'shared/theme';
import { RootStoresProvider, rootStore } from 'stores/index';
import { ApolloProvider } from '@apollo/client';
import client from 'graphql/client';
import { LoadScript } from '@react-google-maps/api';
import Nav from './Nav';
import Router from './Router';
import 'reset-css';
import 'assets/fonts/notoSans/index.css';
import './style/index.scss';

function App() {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <RootStoresProvider value={rootStore}>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? ''} libraries={['places']}>
              <Nav />
              <Router />
            </LoadScript>
          </RootStoresProvider>
        </ThemeProvider>
      </ApolloProvider>
    </React.StrictMode>
  );
}

export default App;
