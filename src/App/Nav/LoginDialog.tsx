import React, { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import Dialog from 'components/Dialog';
import { useRootStores } from 'stores/index';
import styles from './styles/LoginDialog.module.scss';

interface Props {
  children: ReactNode;
}
const LoginDialog = ({ children }: Props) => {
  const { profileStore } = useRootStores();
  return (
    <Dialog wrapperClass={styles.wrapper} open={profileStore.isOpenLoginDialog} onClose={profileStore.closeLoginDialog}>
      <div className={styles.title}>Welcome Skyrealm!</div>
      {children}
    </Dialog>
  );
};

export default observer(LoginDialog);
