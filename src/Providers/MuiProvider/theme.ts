import { alpha, createTheme, responsiveFontSizes, PaletteColor, PaletteColorOptions } from '@mui/material';
import { ReactComponent as ExpandIcon } from 'assets/icons/expand.svg';

declare module '@mui/material/styles' {
  interface Palette {
    border?: PaletteColor;
  }
  interface PaletteOptions {
    border?: PaletteColorOptions;
  }
}

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontSize: 14,
      fontFamily: [
        'NotoSans',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightBold: 700,
    },
    palette: {
      primary: {
        light: '#5977db',
        main: '#3056D3',
        dark: '#213c93',
      },
      success: {
        light: '#46d48f',
        main: '#18CA74',
        dark: '#108d51',
      },
      error: {
        light: '#ff3333',
        main: '#FF0000',
        dark: '#b20000',
      },
      border: {
        light: '#F8F7FE',
        main: '#E0DEF7',
        dark: '#7065F0',
      },
      background: {
        default: '#fafafa',
      },
    },
    spacing: 10,
  }),
);

theme.components = {
  MuiToolbar: {
    styleOverrides: {
      gutters: {
        paddingLeft: `${theme.spacing(2)} !important`,
        paddingRight: `${theme.spacing(2)} !important`,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        fontWeight: 700,
        boxShadow: 'none',
        borderRadius: theme.spacing(1),
        textTransform: 'initial',
      },
    },
    defaultProps: {
      disableFocusRipple: true,
    },
    variants: [
      {
        props: { variant: 'outlined' },
        style: {
          border: `2px solid ${theme.palette.border?.main}`,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
      {
        props: { size: 'small' },
        style: {
          padding: `${theme.spacing(0.7)} ${theme.spacing(1.4)}`,
        },
      },
      {
        props: { size: 'medium' },
        style: {
          padding: `${theme.spacing(1.7)} ${theme.spacing(3.4)}`,
        },
      },
      {
        props: { size: 'large' },
        style: {
          padding: `${theme.spacing(2.2)} ${theme.spacing(4.4)}`,
        },
      },
    ],
  },
  MuiInputBase: {
    variants: [
      {
        props: {
          size: 'medium',
        },
        style: {
          input: {
            padding: 20,
          },
        },
      },
    ],
    styleOverrides: {
      root: {
        fontSize: 14,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        color: theme.palette.common.black,
        background: theme.palette.common.white,
        borderRadius: theme.spacing(1),
      },
      notchedOutline: {
        paddingLeft: 12,
        paddingRight: 12,
        borderColor: theme.palette.border?.main,
        borderWidth: 2,
        borderRadius: theme.spacing(1),
      },
    },
  },
  MuiSelect: {
    defaultProps: {
      IconComponent: ExpandIcon,
      displayEmpty: true,
      MenuProps: {
        keepMounted: true,
      },
    },
    styleOverrides: {
      icon: {
        color: theme.palette.border?.dark,
        top: 'calc(50% - 10px)',
        right: 12,
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          background: alpha(theme.palette.primary.main, 0.05),
          '&.Mui-focusVisible': {
            background: alpha(theme.palette.primary.main, 0.05),
          },
        },
        '&.Mui-focusVisible': {
          background: alpha(theme.palette.primary.main, 0.05),
        },
        ':hover': {
          background: `${alpha(theme.palette.primary.main, 0.05)} !important`,
        },
      },
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      option: {
        '&.Mui-focused': {
          background: `${alpha(theme.palette.primary.main, 0.05)} !important`,
        },
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          background: theme.palette.border?.light,
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: theme.spacing(1),
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 40,
        paddingRight: 40,
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 40,
        paddingRight: 40,
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: 40,
      },
    },
  },
};

export default theme;
