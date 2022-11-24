import React, { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import Dialog from 'components/Dialog';
import { useRootStores } from 'stores/index';

interface Props {
  children: ReactNode;
}
const LoginDialog = ({ children }: Props) => {
  const { user } = useRootStores();
  return (
    <Dialog open={user.isOpenLoginDialog} onClose={user.closeLoginDialog}>
      {children}
    </Dialog>
  );
};

export default observer(LoginDialog);
