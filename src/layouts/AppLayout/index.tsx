import { FC, PropsWithChildren } from "react";

import { Stack } from "@mui/material";

import Footer from "components/Footer";
import ForgotPasswordDialog from "components/ForgotPasswordDialog";
import Header from "components/Header";
import SignInDialog from "components/SignInDialog";
import SignUpDialog from "components/SignUpDialog";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
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
