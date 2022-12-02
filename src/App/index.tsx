import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, Stack, ThemeProvider } from '@mui/material';
import { LoadScript } from '@react-google-maps/api';
import theme from 'shared/theme';
import { RootStoresProvider, rootStore } from 'stores/index';
import { ApolloProvider } from '@apollo/client';
import client from 'graphql/client';
import Loading from 'components/Loading';
import Nav from './Nav';
import Router from './Router';
import Footer from './Footer';
import './style/index.scss';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RootStoresProvider value={rootStore}>
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? ''}
            libraries={['places']}
            loadingElement={<Loading />}
          >
            <BrowserRouter>
              <Stack
                sx={{
                  minHeight: '100vh',
                }}
              >
                <Nav />
                <Stack
                  sx={{
                    flex: 1,
                  }}
                >
                  <Router />
                </Stack>
                <Footer />
              </Stack>
            </BrowserRouter>
          </LoadScript>
        </RootStoresProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
