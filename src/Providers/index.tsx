import { FC, PropsWithChildren } from "react";

import MuiProvider, { MuiProviderProps } from "./MuiProvider";
import NotistackProvider, { NotistackProviderProps } from "./NotistackProvider";
import ReactQueryProvider, {
  ReactQueryProviderProps,
} from "./ReactQueryProvider";

export type ProvidersProps = ReactQueryProviderProps &
  MuiProviderProps &
  NotistackProviderProps;

const Providers: FC<PropsWithChildren<ProvidersProps>> = ({
  children,
  emotionCache,
}) => {
  return (
    <ReactQueryProvider>
      <MuiProvider emotionCache={emotionCache}>
        <NotistackProvider>{children}</NotistackProvider>
      </MuiProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
