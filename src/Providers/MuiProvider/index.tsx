import { FC, PropsWithChildren } from "react";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";

import createEmotionCache from "./createEmotionCache";
import theme from "./theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type MuiProviderProps = {
  emotionCache?: EmotionCache;
};

const MuiProvider: FC<PropsWithChildren<MuiProviderProps>> = ({
  emotionCache,
  children,
}) => {
  return (
    <CacheProvider value={emotionCache ?? clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MuiProvider;
