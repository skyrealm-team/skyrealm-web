import { FC, ReactElement, ReactNode } from "react";

import { AppProps } from "next/app";
import Head from "next/head";

import { EmotionCache } from "@emotion/react";

import Providers from "Providers";
import { NextPage } from "next";

import AppLayout from "layouts/AppLayout";

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
};

const MyApp: FC<MyAppProps> = ({ Component, emotionCache, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Providers emotionCache={emotionCache}>
        <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
      </Providers>
    </>
  );
};

export default MyApp;
