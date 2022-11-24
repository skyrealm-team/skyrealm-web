import { createTheme } from '@mui/material';
import MuiButton from './components/MuiButton';
import palette from './palette';

const theme = createTheme({
  components: {
    MuiButton,
  },
  palette,
});
export default theme;
