import React from 'react';
import { observer } from 'mobx-react-lite';
import { AppBar, Box, Toolbar } from '@mui/material';
import Logo from './Logo';
import LoginButtons from './LoginButtons';
import LoginDialog from './LoginDialog';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import Profile from './Profile';
import { useRootStores } from 'stores/index';

export const NavHeight = 90;

const Nav = () => {
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
            minHeight: NavHeight,
          }}
        >
          <Logo />
          <Box flex={1} />
          {profileStore.isLogin ? <Profile /> : <LoginButtons />}
        </Toolbar>
      </AppBar>
      <Toolbar
        style={{
          minHeight: NavHeight,
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
