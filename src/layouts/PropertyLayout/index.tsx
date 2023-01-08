import { FC, PropsWithChildren } from "react";
import { useMeasure } from "react-use";

import { NextSeo } from "next-seo";
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

import NearbyResidentsIcon from "assets/icons/nearby-residents.svg";
import PropertyInfoIcon from "assets/icons/property-info.svg";
import VisitorProfileIcon from "assets/icons/visitor-profile.svg";
import VisitsIcon from "assets/icons/visits.svg";
import ContactButton from "components/ContactButton";
import useQueryListing from "graphql/useQueryListing";

const PropertyLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { lid } = router.query;

  const { data: listing, isLoading: listingIsLoading } = useQueryListing({
    listingId: lid && String(lid),
  });

  const menu: {
    key: string;
    MenuItemProps?: MenuItemProps;
    ListItemIconProps?: ListItemIconProps;
    ListItemTextProps?: ListItemTextProps;
  }[] = [
    ...(listing?.paid
      ? [
          {
            key: "property-info",
            ListItemIconProps: {
              children: <PropertyInfoIcon />,
            },
            ListItemTextProps: {
              children: "Property info",
            },
          },
        ]
      : []),
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

  if (!listingIsLoading && !listing) {
    return <Error statusCode={404} withDarkMode={false} />;
  }

  return (
    <>
      <NextSeo
        title={`${listing?.address} | Skyrealm`}
        description={listing?.overview ?? undefined}
      />
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
              alignItems: "center",
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
              ({
                key,
                MenuItemProps,
                ListItemIconProps,
                ListItemTextProps,
              }) => {
                const selected =
                  router.asPath.includes(key) || MenuItemProps?.selected;

                return (
                  <Link
                    key={key}
                    href={{
                      pathname: `/listing/${lid}/${key}`,
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
          <ContactButton
            sx={{
              width: 190,
              height: 50,
            }}
          />
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
    </>
  );
};

export default PropertyLayout;
