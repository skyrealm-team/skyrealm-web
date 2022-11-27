import React from 'react';
import { observer } from 'mobx-react-lite';
import { Avatar, useTheme } from '@mui/material';
import { useRootStores } from 'stores/index';
import Dropdown from 'components/Dropdown';
import LogoutIcon from '@mui/icons-material/Logout';
import Flex from 'components/Flex';
import styles from './styles/Profile.module.scss';

const Profile = () => {
  const { profileStore } = useRootStores();
  const theme = useTheme();
  const overlay = (
    <div className={styles.menuWrapper}>
      <div className={styles.menu}>
        <div className={styles.menuItem} onClick={profileStore.logoff}>
          <LogoutIcon className="mr10" sx={{ fontSize: '20px' }} />
          Logout
        </div>
      </div>
    </div>
  );
  return (
    <Flex>
      <span className="gray-main f14 mr10">{profileStore.user?.email}</span>
      <Dropdown overlay={overlay}>
        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>{profileStore.shortName}</Avatar>
      </Dropdown>
    </Flex>
  );
};

export default observer(Profile);
