import React from 'react';
import cx from 'classnames';
import Flex from 'components/Flex';
import Logo from './Logo';
import LoginButtons from './LoginButtons';
import LoginDialog from './LoginDialog';
import SignInForm from './SignInForm';
import styles from './styles/index.module.scss';

const Nav = () => {
  return (
    <>
      <Flex className={cx(styles.wrapper, 'container')} leftNode={<Logo />} rightNode={<LoginButtons />} />
      <LoginDialog>
        <SignInForm />
      </LoginDialog>
    </>
  );
};

export default Nav;
