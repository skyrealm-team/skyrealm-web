import { createTheme } from '@mui/material';
import { ReactComponent as ExpandIcon } from 'assets/icons/expand.svg';
import MuiButton from './components/MuiButton';
import MuiOutlinedInput from './components/MuiOutlinedInput';
import palette from './palette';

const theme = createTheme({
  components: {
    MuiButton,
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: {
          color: palette.common.black,
          fontSize: 14,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandIcon,
        displayEmpty: true,
      },
      styleOverrides: {
        icon: {
          color: palette.border?.dark,
          top: 'calc(50% - 10px)',
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
    MuiOutlinedInput,
  },
  palette,
  spacing: 10,
});
export default theme;
