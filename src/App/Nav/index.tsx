import React from 'react';
import cx from 'classnames';
import Flex from 'components/Flex';
import Logo from './Logo';
import LoginButtons from './LoginButtons';
import LoginDialog from './LoginDialog';
import SignUpForm from './SignUpForm';
import styles from './styles/index.module.scss';
import SignInForm from './SignInForm';

const Nav = () => {
  return (
    <>
      <Flex className={cx(styles.wrapper, 'container')}>
        <Logo />
        <LoginButtons />
      </Flex>
      <LoginDialog>
        <SignInForm />
        <SignUpForm />
      </LoginDialog>
    </>
  );
};

export default Nav;
