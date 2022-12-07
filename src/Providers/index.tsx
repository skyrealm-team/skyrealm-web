import { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

import GoogleMapsProvider from './GoogleMapsProvider';
import MuiProvider from './MuiProvider';
import NotistackProvider from './NotistackProvider';
import ReactQueryProvider from './ReactQueryProvider';

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
