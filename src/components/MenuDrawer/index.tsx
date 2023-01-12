import React, { FC, PropsWithChildren } from "react";
import { useMeasure } from "react-use";

import {
  Drawer,
  ListItemIconProps,
  ListItemTextProps,
  MenuItemProps,
  Theme,
  Toolbar,
  useMediaQuery,
} from "@mui/material";

import useOpens from "hooks/useOpens";

enum Menus {
  "property-info" = "property-info",
  "visits" = "visits",
  "visitor-profile" = "visitor-profile",
  "nearby-residents" = "nearby-residents",
}

export type MenuDrawerProps = {
  list: {
    key: Menus;
    MenuItemProps?: MenuItemProps;
    ListItemIconProps?: ListItemIconProps;
    ListItemTextProps?: ListItemTextProps;
  }[];
};
const MenuDrawer: FC<PropsWithChildren> = ({ children }) => {
  const upSM = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
  const [opens, setOpens] = useOpens();
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  return (
    <>
      {!upSM ? (
        <Drawer
          variant="temporary"
          open={opens.menuDrawer}
          onClose={() => {
            setOpens({
              ...opens,
              menuDrawer: false,
            });
          }}
          ModalProps={{
            keepMounted: true,
          }}
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
          {children}
        </Drawer>
      ) : (
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
          {children}
        </Drawer>
      )}
    </>
  );
};

export default MenuDrawer;
