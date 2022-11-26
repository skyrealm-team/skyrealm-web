import React, { ReactNode } from 'react';
import { Box, BoxProps } from '@mui/material';
import cx from 'classnames';
import styles from './index.module.scss';
import Create from '../Create';

const JUSTIFY = {
  spaceBetween: styles.spaceBetween,
};

const ALIGN = {
  center: styles.alignCenter,
  end: styles.alignEnd,
};

type Props = BoxProps & {
  children: ReactNode[];
  justify?: ValueOf<typeof JUSTIFY>;
  align?: ValueOf<typeof ALIGN>;
  itemClass?: string;
};

const Flex = ({
  children,
  className,
  itemClass,
  justify = JUSTIFY.spaceBetween,
  align = ALIGN.center,
  ...restProps
}: Props) => {
  return (
    <Box className={cx(styles.wrapper, className, justify, align)} {...restProps}>
      <div className={itemClass}>{children[0]}</div>
      <Create visible={!!children[1]}>
        <div className={itemClass}>{children[1]}</div>
      </Create>
    </Box>
  );
};

Flex.JUSTIFY = JUSTIFY;
Flex.ALIGN = ALIGN;

export default Flex;
