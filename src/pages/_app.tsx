import { FC, ReactElement, ReactNode } from "react";
import { Hydrate } from "react-query";

import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";

import { EmotionCache } from "@emotion/react";

import Providers from "Providers";

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

  console.log(process.env.app_env, process.env.APP_ENV);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Providers emotionCache={emotionCache}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
        </Hydrate>
      </Providers>
    </>
  );
};

export default MyApp;
