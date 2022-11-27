import React, { ReactNode, useCallback } from 'react';
import { useBoolean } from 'react-use';
import cx from 'classnames';
import styles from './index.module.scss';

interface Props {
  children: ReactNode;
  overlay: ReactNode;
}

const Index = ({ overlay, children }: Props) => {
  const [open, setOpen] = useBoolean(false);
  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const onOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);
  return (
    <div className={styles.wrapper} onMouseLeave={onClose}>
      <span onMouseOver={onOpen}>{children}</span>
      <span
        onClick={() => {
          setTimeout(onClose, 0);
        }}
        className={cx(styles.overlay, open && styles.overlayVisible)}
      >
        {overlay}
      </span>
    </div>
  );
};

export default Index;
