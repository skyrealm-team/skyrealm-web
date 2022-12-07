import { FC } from 'react';

import { Stack } from '@mui/material';

import Providers from 'Providers';

import Footer from './Footer';
import Header from './Header';
import Router from './Router';

const App: FC = () => {
  return (
    <Providers>
      <Stack
        sx={{
          minHeight: '100vh',
        }}
      >
        <Header />
        <Stack
          sx={{
            flex: 1,
          }}
        >
          <Router />
        </Stack>
        <Footer />
      </Stack>
    </Providers>
  );
};

export default App;
