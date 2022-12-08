import { FC } from "react";
import { useMeasure } from "react-use";

import Link from "next/link";

import { AppBar, Stack, Toolbar } from "@mui/material";

import LogoIcon from "assets/icons/logo.svg";
import SkyrealmIcon from "assets/icons/skyrealm.svg";
import useUserInfo from "graphql/useUserInfo";

import AvatarButton from "./AvatarButton";
import SignInButton from "./SignInButton";
import SignUpButton from "./SignUpButton";

const Header: FC = () => {
  const { data: userInfo, isLoading } = useUserInfo();

  const [ref, { height }] = useMeasure<HTMLDivElement>();

  return (
    <>
      <AppBar
        color="inherit"
        sx={{
          boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar
          ref={ref}
          style={{
            justifyContent: "space-between",
          }}
        >
          <Link href="/">
            <Stack direction="row" gap={2} alignItems="center">
              <LogoIcon />
              <SkyrealmIcon />
            </Stack>
          </Link>
          <Stack direction="row" gap={3}>
            {!isLoading && !userInfo && (
              <>
                <SignInButton />
                <SignUpButton />
              </>
            )}
            <AvatarButton />
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar
        style={{
          height,
        }}
      />
    </>
  );
};

export default Header;
