import React, { ReactNode } from 'react';
import { Box, BoxProps } from '@mui/material';
import cx from 'classnames';
import styles from './index.module.scss';

const JUSTIFY = {
  spaceBetween: styles.spaceBetween,
};

type Props = BoxProps & {
  leftNode?: ReactNode;
  rightNode?: ReactNode;
  justify?: ValueOf<typeof JUSTIFY>;
};

const Flex = ({ leftNode, rightNode, className, justify = JUSTIFY.spaceBetween, ...restProps }: Props) => {
  return (
    <Box className={cx(styles.wrapper, className, justify)} {...restProps}>
      <div>{leftNode}</div>
      <div>{rightNode}</div>
    </Box>
  );
};

Flex.JUSTIFY = JUSTIFY;

export default Flex;
