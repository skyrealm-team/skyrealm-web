import React from 'react';
import logo from 'assets/imgs/logoText.png';
import Image from 'components/Image';
import styles from './styles/Logo.module.scss';

const Logo = () => {
  return <Image src={logo} alt="logo" className={styles.logoText} />;
};

export default Logo;
