import React, { FC } from 'react';
import { AppBar, Divider, Link, Stack } from '@mui/material';
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';
import { TermsOfService, PrivacyPolicy } from 'constants/links';

const Footer: FC = () => {
  return (
    <AppBar
      component="footer"
      position="static"
      color="inherit"
      sx={(theme) => ({
        zIndex: theme.zIndex.appBar,
        boxShadow: 'none',
      })}
    >
      <Stack
        direction="row"
        gap={3}
        alignItems="center"
        justifyContent="center"
        sx={{
          p: 1,
        }}
      >
        <LogoIcon />
        <Stack direction="row" gap={2} alignItems="center">
          <Link color="inherit" underline="none" href="">
            Contact Us
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderColor: 'common.black',
            }}
          />
          <Link color="inherit" underline="none" href={TermsOfService}>
            Terms of Use
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderColor: 'common.black',
            }}
          />
          <Link color="inherit" underline="none" href={PrivacyPolicy}>
            Privacy Policy
          </Link>
        </Stack>
      </Stack>
    </AppBar>
  );
};

export default Footer;
