import { FC, PropsWithChildren } from "react";
import { useUpdateEffect } from "react-use";

import { useRouter } from "next/router";

import { Stack } from "@mui/material";

import Footer from "components/Footer";
import ForgotPasswordDialog from "components/ForgotPasswordDialog";
import Header from "components/Header";
import SignInDialog from "components/SignInDialog";
import SignUpDialog from "components/SignUpDialog";
import useQueryListingsArgs from "hooks/useQueryListingsArgs";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { setQueryListingsArgs } = useQueryListingsArgs();

  useUpdateEffect(() => {
    try {
      setQueryListingsArgs(
        JSON.parse(String(router.query["queryListingsArgs"])),
        true
      );
    } catch {}
  }, [router.query["queryListingsArgs"]]);

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
