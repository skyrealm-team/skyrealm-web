import React, { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactQueryProvider from './ReactQueryProvider';
import MuiProvider from './MuiProvider';
import NotistackProvider from './NotistackProvider';
import GoogleMapsProvider from './GoogleMapsProvider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <MuiProvider>
        <NotistackProvider>
          <GoogleMapsProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </GoogleMapsProvider>
        </NotistackProvider>
      </MuiProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
