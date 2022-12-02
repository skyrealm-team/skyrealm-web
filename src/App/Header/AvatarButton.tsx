import React, { FC, useState } from 'react';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg';
import useUserInfo from 'graphql/useUserInfo';
import useLogoff from 'graphql/useLogoff';

const AvatarButton: FC = () => {
  const { data: userInfo } = useUserInfo();
  const { mutateAsync: logoff } = useLogoff();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();

  if (!userInfo) {
    return null;
  }

  return (
    <>
      <IconButton
        onClick={async (event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <Avatar
          sx={(theme) => ({
            bgcolor: theme.palette.primary.main,
          })}
        >
          {userInfo.getUserUserInfo.firstName?.[0].toUpperCase() ?? ''}
          {userInfo.getUserUserInfo.lastName?.[0].toUpperCase() ?? ''}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={!!anchorEl}
        onClose={() => {
          setAnchorEl(undefined);
        }}
        onClick={() => {
          setAnchorEl(undefined);
        }}
        PaperProps={{
          square: true,
          sx: (theme) => ({
            borderRadius: `0 0 ${theme.spacing(1)} ${theme.spacing(1)}`,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(17px) !important',
          }),
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={async () => {
            await logoff({
              email: userInfo.getUserUserInfo.email,
            });
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AvatarButton;
