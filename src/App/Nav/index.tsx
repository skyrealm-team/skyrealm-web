import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppBar, Stack, Toolbar } from '@mui/material';
import LoginButtons from './LoginButtons';
import LoginDialog from './LoginDialog';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import Profile from './Profile';
import { useRootStores } from 'stores/index';
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';
import { ReactComponent as SkyrealmIcon } from 'assets/icons/skyrealm.svg';

export const NavHeight = 90;

const Nav: FC = () => {
  const { profileStore } = useRootStores();
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
          {profileStore.isLogin ? <Profile /> : <LoginButtons />}
        </Toolbar>
      </AppBar>
      <Toolbar
        style={{
          height: NavHeight,
        }}
      />
      <LoginDialog>
        <SignInForm />
        <SignUpForm />
      </LoginDialog>
    </>
  );
};

export default observer(Nav);
