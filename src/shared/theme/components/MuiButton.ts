import { Size, Variant } from '../../enums';
import palette from '../palette';

const MuiButton = {
  styleOverrides: {
    root: {
      boxShadow: 'none',
      borderRadius: '10px',
    },
  },
  variants: [
    {
      props: { variant: Variant.contained, size: Size.lg },
      style: {
        paddingTop: '11px',
        paddingBottom: '11px',
      },
    },
    {
      props: { variant: Variant.outlined },
      style: {
        border: `2px solid ${palette.primaryOutline.light}`,
        '&:hover': {
          borderWidth: '2px',
        },
      },
    },
    {
      props: { variant: Variant.outlined, size: Size.lg },
      style: {
        paddingTop: '9px',
        paddingBottom: '9px',
      },
    },
  ],
};
export default MuiButton;
