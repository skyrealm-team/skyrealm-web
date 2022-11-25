import { ThemeOptions } from '@mui/material';
import palette from '../palette';

const MuiOutlinedInput: Required<ThemeOptions>['components']['MuiOutlinedInput'] = {
  styleOverrides: {
    root: {
      color: palette.common.black,
      ':hover': {
        fieldset: {
          borderColor: `${palette.border?.main} !important`,
        },
      },
    },
    notchedOutline: {
      borderColor: palette.border?.main,
      borderWidth: 2,
      borderRadius: 10,
    },
  },
};
export default MuiOutlinedInput;
