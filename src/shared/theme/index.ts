import { alpha, createTheme } from '@mui/material';
import { ReactComponent as ExpandIcon } from 'assets/icons/expand.svg';
import MuiButton from './components/MuiButton';
import MuiOutlinedInput from './components/MuiOutlinedInput';
import palette from './palette';

const theme = createTheme({
  components: {
    MuiButton,
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: 14,
        },
      },
    },
    MuiOutlinedInput,
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
          color: palette.border?.dark,
          top: 'calc(50% - 10px)',
          right: 12,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            background: alpha(palette.primary.main, 0.05),
            '&.Mui-focusVisible': {
              background: alpha(palette.primary.main, 0.05),
            },
          },
          '&.Mui-focusVisible': {
            background: alpha(palette.primary.main, 0.05),
          },
          ':hover': {
            background: `${alpha(palette.primary.main, 0.05)} !important`,
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          '&.Mui-focused': {
            background: `${alpha(palette.primary.main, 0.05)} !important`,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            background: palette.border?.light,
          },
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
  },
  palette,
  spacing: 10,
});
export default theme;
