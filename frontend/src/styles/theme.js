import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', 
    primary: {
      main: '#212121', 
    },
    secondary: {
      main: '#757575', 
    },
    background: {
      default: '#f5f5f5', 
      paper: '#e0e0e0', 
    },
    text: {
      primary: '#212121', 
      secondary: '#757575', 
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif', 
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
    h4: { fontWeight: 500 },
    h5: { fontWeight: 400 },
    h6: { fontWeight: 400 },
    body1: { fontWeight: 300 },
    body2: { fontWeight: 300 },
  },
});

export default theme;
