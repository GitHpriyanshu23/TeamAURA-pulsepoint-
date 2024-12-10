import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // Light mode but custom black/grey colors
    primary: {
      main: '#212121', // Black for primary actions
    },
    secondary: {
      main: '#757575', // Grey for secondary actions
    },
    background: {
      default: '#f5f5f5', // Light grey background for the app
      paper: '#e0e0e0', // Slightly darker grey for cards
    },
    text: {
      primary: '#212121', // Dark text for readability
      secondary: '#757575', // Grey for secondary text
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif', // Set Poppins as the font family
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
