import { FC, useMemo, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemIconProps,
  Menu,
  MenuItem,
  MenuItemProps,
} from "@mui/material";

import FavoriteIcon from "assets/icons/favorite.svg";
import LogoutIcon from "assets/icons/logout.svg";
import Loading from "components/Loading";
import useGetUserInfo from "graphql/useGetUserInfo";
import useLogoff from "graphql/useLogoff";

const AvatarButton: FC = () => {
  const router = useRouter();

  const { data: userInfo } = useGetUserInfo();
  const { mutateAsync: logoff, isLoading: logoffIsLoading } = useLogoff();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();

  const menu = useMemo<
    {
      pathname: string;
      MenuItemProps: MenuItemProps;
      ListItemIconProps: ListItemIconProps;
    }[]
  >(
    () => [
      {
        pathname: "/user/saved-list",
        MenuItemProps: {
          children: "Saved List",
        },
        ListItemIconProps: {
          children: <FavoriteIcon />,
        },
      },
    ],
    []
  );

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
          {userInfo?.firstName?.[0].toUpperCase() ?? ""}
          {userInfo?.lastName?.[0].toUpperCase() ?? ""}
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
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }),
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {menu.map(({ pathname, MenuItemProps, ListItemIconProps }, index) => {
          const selected = router.asPath === pathname;

          return (
            <Link
              key={index}
              href={{
                pathname,
              }}
              legacyBehavior
            >
              <MenuItem
                selected={selected}
                {...MenuItemProps}
                sx={(theme) => ({
                  ...(selected && {
                    color: theme.palette.primary.main,
                  }),
                })}
              >
                <ListItemIcon
                  {...ListItemIconProps}
                  sx={{
                    color: "inherit",
                    ...ListItemIconProps.sx,
                  }}
                />
                {MenuItemProps.children}
              </MenuItem>
            </Link>
          );
        })}
        <MenuItem
          onClick={async () => {
            await logoff({
              email: userInfo?.email,
            });
          }}
        >
          <ListItemIcon
            sx={{
              color: "inherit",
            }}
          >
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Loading open={logoffIsLoading} />
    </>
  );
};

export default AvatarButton;
