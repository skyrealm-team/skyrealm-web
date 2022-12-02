import { ThemeOptions } from '@mui/material';
import palette from '../palette';

const MuiOutlinedInput: Required<ThemeOptions>['components']['MuiOutlinedInput'] = {
  styleOverrides: {
    root: {
      color: palette.common.black,
      background: palette.common.white,
      borderRadius: 10,
    },
    input: {
      paddingTop: 13.5,
      paddingBottom: 13.5,
    },
    notchedOutline: {
      paddingLeft: 12,
      paddingRight: 12,
      borderColor: palette.border?.main,
      borderWidth: 2,
      borderRadius: 10,
    },
  },
};
export default MuiOutlinedInput;
