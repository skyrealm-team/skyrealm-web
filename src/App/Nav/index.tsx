import React from 'react';
import cx from 'classnames';
import { observer } from 'mobx-react-lite';
import Flex from 'components/Flex';
import Logo from './Logo';
import LoginButtons from './LoginButtons';
import LoginDialog from './LoginDialog';
import SignUpForm from './SignUpForm';
import styles from './styles/index.module.scss';
import SignInForm from './SignInForm';
import Profile from './Profile';
import { useRootStores } from 'stores/index';

const Nav = () => {
  const { profileStore } = useRootStores();
  return (
    <>
      <Flex className={cx(styles.wrapper, 'container')}>
        <Logo />
        {profileStore.isLogin ? <Profile /> : <LoginButtons />}
        <Profile />
      </Flex>
      <LoginDialog>
        <SignInForm />
        <SignUpForm />
      </LoginDialog>
    </>
  );
};

export default observer(Nav);
