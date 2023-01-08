import React from "react";
import { useMeasure, useUpdateEffect } from "react-use";

import { NextPage } from "next";
import Error from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Drawer,
  ListItemIcon,
  ListItemIconProps,
  ListItemText,
  ListItemTextProps,
  MenuItem,
  MenuItemProps,
  MenuList,
  Stack,
  Toolbar,
} from "@mui/material";

import FavoriteIcon from "assets/icons/favorite.svg";
import UserSavedList from "components/UserSavedList";
import useGetUserInfo from "graphql/useGetUserInfo";

enum Tabs {
  "saved-list" = "saved-list",
}

const User: NextPage = () => {
  const router = useRouter();
  const { t: tab } = router.query;

  const {
    data: userInfo,
    isLoading: userInfoIsLoading,
    isFetched: userInfoIsFetched,
  } = useGetUserInfo();

  const menu: {
    key: Tabs;
    MenuItemProps?: MenuItemProps;
    ListItemIconProps?: ListItemIconProps;
    ListItemTextProps?: ListItemTextProps;
  }[] = [
    {
      key: Tabs["saved-list"],
      ListItemIconProps: {
        children: <FavoriteIcon />,
      },
      ListItemTextProps: {
        children: "Saved List",
      },
    },
  ];

  const [ref, { width }] = useMeasure<HTMLDivElement>();

  useUpdateEffect(() => {
    if (
      (!userInfoIsFetched && !userInfoIsLoading) ||
      (userInfoIsFetched && !userInfo)
    ) {
      router.push("/");
    }
  }, [userInfoIsFetched, userInfoIsLoading, userInfo]);

  const tabIsInvalid = !Object.keys(Tabs).includes(String(tab));

  if (tabIsInvalid || (!userInfoIsLoading && !userInfo)) {
    return <Error statusCode={404} withDarkMode={false} />;
  }

  return (
    <Stack direction="row">
      <Drawer
        variant="permanent"
        PaperProps={{
          ref,
          elevation: 0,
          square: true,
          sx: {
            width: "fit-content",
            filter: "drop-shadow(4px 0px 26px rgba(0, 0, 0, 0.03))",
          },
        }}
        sx={(theme) => ({
          width,
          zIndex: theme.zIndex.appBar - 1,
        })}
      >
        <Toolbar />
        <MenuList
          component={Stack}
          gap={1}
          sx={{
            py: 1.75,
          }}
        >
          {menu.map(
            ({ key, MenuItemProps, ListItemIconProps, ListItemTextProps }) => {
              const selected = key === tab || MenuItemProps?.selected;

              return (
                <Link
                  key={key}
                  href={{
                    pathname: `/user`,
                    query: {
                      t: key,
                    },
                  }}
                  legacyBehavior
                  shallow
                >
                  <MenuItem
                    {...MenuItemProps}
                    sx={{
                      px: 3.4,
                      py: 0.8,
                    }}
                  >
                    <ListItemIcon
                      {...ListItemIconProps}
                      sx={(theme) => ({
                        color: "#333333",
                        ...(selected && {
                          color: theme.palette.primary.main,
                        }),
                      })}
                    />
                    <ListItemText
                      disableTypography
                      {...ListItemTextProps}
                      sx={(theme) => ({
                        color: "#999999",
                        ...(selected && {
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                        }),
                      })}
                    />
                  </MenuItem>
                </Link>
              );
            }
          )}
        </MenuList>
      </Drawer>
      <Stack
        sx={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        {tab === Tabs["saved-list"] && <UserSavedList />}
      </Stack>
    </Stack>
  );
};

export default User;
