import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
      marginBottom: '20px',
    },
    body1: {
      color: '#555',
    },
  },
});

export default theme;
