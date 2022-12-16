import { FC, PropsWithChildren } from "react";
import { useMeasure } from "react-use";

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

import NearbyResidentsIcon from "assets/icons/nearby-residents.svg";
import PropertyInfoIcon from "assets/icons/property-info.svg";
import VisitorProfileIcon from "assets/icons/visitor-profile.svg";
import VisitsIcon from "assets/icons/visits.svg";

const ListingLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { lid } = router.query;

  const menu: {
    key: string;
    MenuItemProps?: MenuItemProps;
    ListItemIconProps?: ListItemIconProps;
    ListItemTextProps?: ListItemTextProps;
  }[] = [
    {
      key: "property-info",
      ListItemIconProps: {
        children: <PropertyInfoIcon />,
      },
      ListItemTextProps: {
        children: "Property info",
      },
    },
    {
      key: "visits",
      ListItemIconProps: {
        children: <VisitsIcon />,
      },
      ListItemTextProps: {
        children: "Visits",
      },
    },
    {
      key: "visitor-profile",
      ListItemIconProps: {
        children: <VisitorProfileIcon />,
      },
      ListItemTextProps: {
        children: "Visitor profile",
      },
    },
    {
      key: "nearby-residents",
      ListItemIconProps: {
        children: <NearbyResidentsIcon />,
      },
      ListItemTextProps: {
        children: "Nearby residents",
      },
    },
  ];

  const [ref, { width }] = useMeasure<HTMLDivElement>();

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
              const selected =
                router.asPath.includes(key) || MenuItemProps?.selected;

              return (
                <Link
                  key={key}
                  href={{
                    pathname: `/listing/${lid}/${key}`,
                  }}
                  legacyBehavior
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
        {children}
      </Stack>
    </Stack>
  );
};

export default ListingLayout;
