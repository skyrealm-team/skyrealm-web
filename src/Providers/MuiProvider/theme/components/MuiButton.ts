import { ThemeOptions } from '@mui/material';
import palette from '../palette';

const MuiButton: Required<ThemeOptions>['components']['MuiButton'] = {
  styleOverrides: {
    root: {
      boxShadow: 'none',
      borderRadius: '10px',
    },
  },
  defaultProps: {
    disableFocusRipple: true,
  },
  variants: [
    {
      props: { variant: 'outlined' },
      style: {
        border: `2px solid ${palette.border?.main}`,
        '&:hover': {
          borderWidth: 2,
        },
      },
    },
    {
      props: { variant: 'outlined', size: 'medium' },
      style: {
        paddingTop: 10,
        paddingBottom: 10,
      },
    },
    {
      props: { variant: 'outlined', size: 'large' },
      style: {
        paddingTop: 16,
        paddingBottom: 16,
      },
    },
    {
      props: { variant: 'contained', size: 'medium' },
      style: {
        paddingTop: 12,
        paddingBottom: 12,
      },
    },
    {
      props: { variant: 'contained', size: 'large' },
      style: {
        paddingTop: 17,
        paddingBottom: 17,
      },
    },
  ],
};
export default MuiButton;
