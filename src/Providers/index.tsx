import { FC, PropsWithChildren } from "react";

import GoogleMapsProvider, {
  GoogleMapsProviderProps,
} from "./GoogleMapsProvider";
import MuiProvider, { MuiProviderProps } from "./MuiProvider";
import NotistackProvider, { NotistackProviderProps } from "./NotistackProvider";
import ReactQueryProvider, {
  ReactQueryProviderProps,
} from "./ReactQueryProvider";

export type ProvidersProps = ReactQueryProviderProps &
  MuiProviderProps &
  NotistackProviderProps &
  GoogleMapsProviderProps;

const Providers: FC<PropsWithChildren<ProvidersProps>> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <MuiProvider>
        <NotistackProvider>
          <GoogleMapsProvider>{children}</GoogleMapsProvider>
        </NotistackProvider>
      </MuiProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
