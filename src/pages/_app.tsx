import { FC } from "react";

import { AppProps } from "next/app";
import Head from "next/head";

import { EmotionCache } from "@emotion/react";

import { Stack } from "@mui/material";

import Providers from "Providers";

import Footer from "components/Footer";
import ForgotPasswordDialog from "components/ForgotPasswordDialog";
import Header from "components/Header";
import SignInDialog from "components/SignInDialog";
import SignUpDialog from "components/SignUpDialog";

export type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

const MyApp: FC<MyAppProps> = ({ Component, emotionCache, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Providers emotionCache={emotionCache}>
        <>
          <Stack
            sx={{
              minHeight: "100vh",
            }}
          >
            <Header />
            <Stack
              sx={{
                flex: 1,
              }}
            >
              <Component {...pageProps} />
            </Stack>
            <Footer />
          </Stack>
          <SignUpDialog />
          <SignInDialog />
          <ForgotPasswordDialog />
        </>
      </Providers>
    </>
  );
};

export default MyApp;
