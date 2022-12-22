import { FC, PropsWithChildren } from "react";
import { useMount } from "react-use";

import { useRouter } from "next/router";

import { Stack } from "@mui/material";

import { parse } from "querystring";

import Footer from "components/Footer";
import ForgotPasswordDialog from "components/ForgotPasswordDialog";
import Header from "components/Header";
import SignInDialog from "components/SignInDialog";
import SignUpDialog from "components/SignUpDialog";
import useRouterState from "hooks/useRouterState";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { setRouterState } = useRouterState();

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
        }, {}),
        true
      );
    };
    routeChangeComplete(router.asPath);
    router.events.on("routeChangeComplete", routeChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", routeChangeComplete);
    };
  });

  return (
    <Stack
      component="main"
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
        {children}
      </Stack>
      <Footer />
      <SignUpDialog />
      <SignInDialog />
      <ForgotPasswordDialog />
    </Stack>
  );
};

export default AppLayout;
