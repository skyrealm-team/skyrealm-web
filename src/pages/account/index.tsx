import React, { useEffect } from "react";
import { dehydrate, QueryClient } from "react-query";
import { useUpdateEffect } from "react-use";

import { GetServerSideProps, NextPage } from "next";
import Error from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  ListItemIcon,
  ListItemIconProps,
  ListItemText,
  ListItemTextProps,
  MenuItem,
  MenuItemProps,
  MenuList,
  Stack,
  Typography,
} from "@mui/material";

import FavoriteIcon from "assets/icons/favorite.svg";
import ProfileIcon from "assets/icons/profile.svg";
import BrokerProfile from "components/BrokerProfile";
import MenuDrawer from "components/MenuDrawer";
import UserSavedList from "components/UserSavedList";
import useGetUserInfo, {
  getUserInfoRequest,
  getUserUserInfoQuery,
} from "graphql/useGetUserInfo";
import useOpens from "hooks/useOpens";

enum Menus {
  "profile" = "profile",
  "saved-list" = "saved-list",
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

  const [opens, setOpens] = useOpens();

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
      <MenuDrawer>
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
                    onClick={() => {
                      setOpens({
                        ...opens,
                        menuDrawer: false,
                      });
                    }}
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
      </MenuDrawer>
      <Stack
        sx={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Container
          sx={{
            maxWidth: 1300,
            py: {
              xs: 0,
              sm: 8,
            },
            px: {
              xs: 0,
              sm: 3,
            },
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
                px: {
                  sm: 4,
                },
                pt: {
                  sm: 3,
                },
                pb: {
                  sm: 2,
                },
              }}
            />
            <CardContent
              sx={{
                px: {
                  sm: 4,
                },
                pt: {
                  sm: 2,
                },
                pb: {
                  sm: 4,
                },
              }}
            >
              {m === Menus["profile"] && <BrokerProfile />}
              {m === Menus["saved-list"] && <UserSavedList />}
            </CardContent>
            <CardActions />
          </Card>
        </Container>
      </Stack>
    </Stack>
  );
};

export default User;
