import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useMeasure } from 'react-use';

import { AppBar, Stack, Toolbar } from '@mui/material';

import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';
import { ReactComponent as SkyrealmIcon } from 'assets/icons/skyrealm.svg';
import useUserInfo from 'graphql/useUserInfo';

import AvatarButton from './AvatarButton';
import SignInButton from './SignInButton';
import SignUpButton from './SignUpButton';

const Header: FC = () => {
  const { data: userInfo, isLoading } = useUserInfo();

  const [ref, { height }] = useMeasure<HTMLDivElement>();

  return (
    <>
      <AppBar
        color="inherit"
        sx={{
          boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar
          ref={ref}
          style={{
            minHeight: 60,
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
