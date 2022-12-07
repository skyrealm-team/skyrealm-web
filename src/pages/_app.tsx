import * as React from "react";

import { AppProps } from "next/app";
import Head from "next/head";

import { EmotionCache } from "@emotion/react";

import { Stack } from "@mui/material";

import Providers from "Providers";

import Footer from "components/Footer";
import Header from "components/Header";

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache, pageProps } = props;
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Providers emotionCache={emotionCache}>
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
      </Providers>
    </>
  );
};

export default MyApp;
