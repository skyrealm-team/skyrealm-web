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
      props: { variant: Variant.contained, size: Size.md },
      style: {
        paddingTop: '12px',
        paddingBottom: '12px',
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
      props: { variant: Variant.outlined, size: Size.md },
      style: {
        paddingTop: '10px',
        paddingBottom: '10px',
      },
    },
    {
      props: { variant: Variant.contained, size: Size.lg },
      style: {
        paddingTop: '22px',
        paddingBottom: '22px',
      },
    },
    {
      props: { variant: Variant.outlined, size: Size.lg },
      style: {
        paddingTop: '21px',
        paddingBottom: '21px',
      },
    },
  ],
};
export default MuiButton;
