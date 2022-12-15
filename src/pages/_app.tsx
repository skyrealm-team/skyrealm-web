import { FC, ReactElement, ReactNode } from "react";
import { useMount } from "react-use";

import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import { EmotionCache } from "@emotion/react";

import Providers from "Providers";
import { NextPage } from "next";
import { parse } from "querystring";

import { useGlobalRouterState } from "hooks/useRouterState";
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
  const router = useRouter();
  const [, setRouterState] = useGlobalRouterState();

  useMount(() => {
    const routeChangeComplete = (url: string) => {
      setRouterState(
        Object.entries(parse(url.slice(2))).reduce((acc, [key, val]) => {
          try {
            return {
              ...acc,
              [key]: JSON.parse(String(val)),
            };
          } catch {
            return acc;
          }
        }, {})
      );
    };
    routeChangeComplete(router.asPath);
    router.events.on("routeChangeComplete", routeChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", routeChangeComplete);
    };
  });
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
