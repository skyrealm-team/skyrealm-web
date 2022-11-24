import React from 'react';
import cx from 'classnames';
import styles from './index.module.scss';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

const Image = ({ className, src, alt }: Props) => {
  return <img className={cx(className, styles.wrapper)} src={src} alt={alt} />;
};

export default Image;
