import { FC } from "react";
import { useMeasure } from "react-use";

import dynamic from "next/dynamic";

import { AppBar, Link, Stack, Toolbar } from "@mui/material";

import LogoIcon from "assets/icons/logo.svg";
import SkyrealmIcon from "assets/icons/skyrealm.svg";

const AuthButtons = dynamic(() => import("./AuthButtons"), {
  ssr: false,
});

const Header: FC = () => {
  const [ref, { height }] = useMeasure<HTMLDivElement>();

  return (
    <>
      <AppBar
        component="div"
        color="inherit"
        sx={(theme) => ({
          boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.1)",
          zIndex: theme.zIndex.appBar + 1,
        })}
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
          <AuthButtons />
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
