import { FC } from "react";

import {
  AppBar,
  Divider,
  Link,
  Stack,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";

import LogoIcon from "assets/icons/logo.svg";
import { PrivacyPolicy, TermsOfService, ContactUs } from "consts/links";

const Footer: FC = () => {
  const upSM = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

  return (
    <AppBar
      component="footer"
      position="static"
      color="inherit"
      sx={(theme) => ({
        zIndex: theme.zIndex.appBar,
        boxShadow: "none",
        filter: "drop-shadow(0px 1px 10px rgba(0, 0, 0, 0.15))",
      })}
    >
      <Toolbar
        variant="dense"
        sx={{
          overflow: "auto",
        }}
      >
        <Stack
          direction="row"
          gap={3}
          alignItems="center"
          justifyContent="center"
          flex={1}
        >
          {upSM && <LogoIcon />}
          <Stack direction="row" gap={2} alignItems="center">
            <Link
              target="_blank"
              color="inherit"
              underline="none"
              href={ContactUs}
            >
              <Typography variant={!upSM ? "caption" : "button"} noWrap>
                Contact Us
              </Typography>
            </Link>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: "common.black",
              }}
            />
            <Link
              target="_blank"
              color="inherit"
              underline="none"
              href={TermsOfService}
            >
              <Typography variant={!upSM ? "caption" : "button"} noWrap>
                Terms of Use
              </Typography>
            </Link>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: "common.black",
              }}
            />
            <Link
              target="_blank"
              color="inherit"
              underline="none"
              href={PrivacyPolicy}
            >
              <Typography variant={!upSM ? "caption" : "button"} noWrap>
                Privacy Policy
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
