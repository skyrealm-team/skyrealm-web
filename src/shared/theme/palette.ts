import { PaletteColor, PaletteColorOptions } from '@mui/material';
import createPalette from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface Palette {
    border?: PaletteColor;
  }
  interface PaletteOptions {
    border?: PaletteColorOptions;
  }
}

const palette = createPalette({
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
});

export default palette;
