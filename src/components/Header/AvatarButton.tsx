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

import { UrlObject, parse } from "url";

import FavoriteIcon from "assets/icons/favorite.svg";
import LogoutIcon from "assets/icons/logout.svg";
import ProfileIcon from "assets/icons/profile.svg";
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
      href: UrlObject;
      MenuItemProps: MenuItemProps;
      ListItemIconProps: ListItemIconProps;
    }[]
  >(
    () => [
      ...(userInfo?.userType === "broker"
        ? [
            {
              href: {
                pathname: "/account",
                query: {
                  m: "profile",
                },
              },
              MenuItemProps: {
                children: "Profile",
              },
              ListItemIconProps: {
                children: <ProfileIcon />,
              },
            },
          ]
        : []),
      {
        href: {
          pathname: "/account",
          query: {
            m: "saved-list",
          },
        },
        MenuItemProps: {
          children: "Saved List",
        },
        ListItemIconProps: {
          children: <FavoriteIcon />,
        },
      },
    ],
    [userInfo?.userType]
  );

  return (
    <>
      <IconButton
        onClick={async (event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <Avatar
          src={userInfo?.avatar ?? undefined}
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
        {menu.map(({ href, MenuItemProps, ListItemIconProps }, index) => {
          const asPath = parse(router.asPath, true);
          const selected =
            asPath.pathname === href.pathname &&
            Object.entries(href.query ?? {}).every(
              ([key, val]) => asPath.query[key] === val
            );

          return (
            <Link key={index} href={href} legacyBehavior>
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
              email: userInfo?.email ?? null,
            });
            router.replace("/");
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
