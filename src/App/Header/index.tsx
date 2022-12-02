import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Stack, Toolbar } from '@mui/material';
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';
import { ReactComponent as SkyrealmIcon } from 'assets/icons/skyrealm.svg';
import useUserInfo from 'graphql/useUserInfo';
import SignInButton from './SignInButton';
import AvatarButton from './AvatarButton';
import SignUpButton from './SignUpButton';

export const NavHeight = 90;

const Header: FC = () => {
  const { data: userInfo, isLoading: userInfoIsLoading } = useUserInfo();

  return (
    <>
      <AppBar
        color="inherit"
        sx={{
          boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar
          style={{
            height: NavHeight,
            justifyContent: 'space-between',
          }}
        >
          <Link to="/">
            <Stack direction="row" gap={2} alignItems="center">
              <LogoIcon />
              <SkyrealmIcon />
            </Stack>
          </Link>
          <Stack direction="row" gap={3}>
            {!userInfo && !userInfoIsLoading && (
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
          height: NavHeight,
        }}
      />
    </>
  );
};

export default Header;
