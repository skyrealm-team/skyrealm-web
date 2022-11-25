import React from 'react';
import { Dialog as MuiDialog, DialogProps, IconButton } from '@mui/material';
import cx from 'classnames';
import CloseIcon from '@mui/icons-material/Close';
import styles from './index.module.scss';

interface Props extends DialogProps {
  onClose(): void;
  wrapperClass?: string;
}

const Dialog = ({ wrapperClass, onClose, children, ...restProps }: Props) => {
  return (
    <MuiDialog classes={{ root: styles.root }} onClose={onClose} {...restProps} maxWidth={false}>
      <div className={cx(styles.wrapper, wrapperClass)}>{children}</div>
      <IconButton className={styles.closeIconWrapper} onClick={onClose}>
        <CloseIcon className={cx(styles.closeIcon, 'gray-main')} />
      </IconButton>
    </MuiDialog>
  );
};

export default Dialog;
