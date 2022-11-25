import React from 'react';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from 'shared/theme';
import { RootStoresProvider, rootStore } from 'stores/index';
import { ApolloProvider } from '@apollo/client';
import client from 'graphql/client';
import Nav from './Nav';
import Router from './Router';
import 'reset-css';
import 'assets/fonts/notoSans/index.css';
import './style/index.scss';
import GoogleMapsProvider from 'Providers/GoogleMapsProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <RootStoresProvider value={rootStore}>
            <QueryClientProvider client={queryClient}>
              <GoogleMapsProvider>
                <Nav />
                <Router />
              </GoogleMapsProvider>
            </QueryClientProvider>
          </RootStoresProvider>
        </ThemeProvider>
      </ApolloProvider>
    </React.StrictMode>
  );
}

export default App;
