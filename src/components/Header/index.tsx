import { FC } from "react";
import { useMeasure } from "react-use";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  IconButton,
  Link,
  Stack,
  Theme,
  Toolbar,
  useMediaQuery,
} from "@mui/material";

import LogoIcon from "assets/icons/logo.svg";
import SkyrealmIcon from "assets/icons/skyrealm.svg";
import useOpens from "hooks/useOpens";

const AuthButtons = dynamic(() => import("./AuthButtons"), {
  ssr: false,
});

const Header: FC = () => {
  const router = useRouter();
  const upSM = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

  const [opens, setOpens] = useOpens();
  const [ref, { height }] = useMeasure<HTMLDivElement>();

  const menuDrawerShown = ["/listing", "/account"].some((item) =>
    router.pathname.startsWith(item)
  );

  return (
    <>
      <AppBar
        component="nav"
        color="inherit"
        sx={(theme) => ({
          boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.1)",
          zIndex: theme.zIndex.appBar + 1,
        })}
      >
        <Toolbar ref={ref}>
          {menuDrawerShown && !upSM && (
            <IconButton
              edge="start"
              onClick={() => {
                setOpens({
                  ...opens,
                  menuDrawer: !opens.menuDrawer,
                });
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Stack
            flex={1}
            alignItems={menuDrawerShown && !upSM ? "center" : "flex-start"}
          >
            <Link href="/">
              <Stack direction="row" gap={2} alignItems="center">
                <LogoIcon />
                {upSM && <SkyrealmIcon />}
              </Stack>
            </Link>
          </Stack>
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
