import { FC } from "react";
import { useMount } from "react-use";

import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import { EmotionCache } from "@emotion/react";

import { Stack } from "@mui/material";

import Providers from "Providers";
import { parse } from "querystring";

import Footer from "components/Footer";
import ForgotPasswordDialog from "components/ForgotPasswordDialog";
import Header from "components/Header";
import SignInDialog from "components/SignInDialog";
import SignUpDialog from "components/SignUpDialog";
import { useGlobalRouterState } from "hooks/useRouterState";

export type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
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
