import React, { useEffect } from "react";
import { dehydrate, QueryClient } from "react-query";
import { useMeasure, useUpdateEffect } from "react-use";

import { GetServerSideProps, NextPage } from "next";
import Error from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Card,
  CardContent,
  CardHeader,
  Container,
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
  Typography,
} from "@mui/material";

import FavoriteIcon from "assets/icons/favorite.svg";
import ProfileIcon from "assets/icons/profile.svg";
import UserSavedList from "components/UserSavedList";
import useGetUserInfo, {
  getUserInfoRequest,
  getUserUserInfoQuery,
} from "graphql/useGetUserInfo";

enum Menus {
  "saved-list" = "saved-list",
  "profile" = "profile",
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery([getUserUserInfoQuery], () => {
      return getUserInfoRequest({
        requestHeaders: {
          cookie: context.req.headers.cookie,
        } as never,
      });
    }),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const User: NextPage = () => {
  const router = useRouter();

  const {
    data: userInfo,
    isLoading: userInfoIsLoading,
    isFetched: userInfoIsFetched,
  } = useGetUserInfo();

  const menu: {
    key: Menus;
    MenuItemProps?: MenuItemProps;
    ListItemIconProps?: ListItemIconProps;
    ListItemTextProps?: ListItemTextProps;
  }[] = [
    ...(userInfo?.userType === "broker"
      ? [
          {
            key: Menus["profile"],
            ListItemIconProps: {
              children: <ProfileIcon />,
            },
            ListItemTextProps: {
              children: "Profile",
            },
          },
        ]
      : []),
    {
      key: Menus["saved-list"],
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

  const { m = menu[0].key } = router.query;
  const menuIsInvalid = !menu.find((item) => item.key === String(m));

  useEffect(() => {
    if (menuIsInvalid) {
      router.replace({
        pathname: `/account`,
      });
    }
  }, [menuIsInvalid, router]);

  if (menuIsInvalid || (!userInfoIsLoading && !userInfo)) {
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
              const selected = key === m || MenuItemProps?.selected;

              return (
                <Link
                  key={key}
                  href={{
                    pathname: `/account`,
                    query: {
                      m: key,
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
        <Container
          sx={{
            maxWidth: 1300,
            py: 8,
          }}
        >
          <Card elevation={0} square={false}>
            <CardHeader
              title={
                <Typography
                  sx={{
                    fontsize: 20,
                    fontWeight: 700,
                  }}
                >
                  {
                    menu.find((item) => item.key === m)?.ListItemTextProps
                      ?.children
                  }
                </Typography>
              }
              sx={{
                px: 4,
                pt: 3,
                pb: 2,
              }}
            />
            <CardContent
              sx={{
                px: 4,
                pt: 2,
                pb: 4,
              }}
            >
              {m === Menus["saved-list"] && <UserSavedList />}
            </CardContent>
          </Card>
        </Container>
      </Stack>
    </Stack>
  );
};

export default User;
