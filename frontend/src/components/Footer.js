import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'secondary.main',
        color: 'white',
        py: 2,
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2">&copy; 2024 PulsePoint. All rights reserved.</Typography>
      <Typography variant="body2">
        <a href="/terms" style={{ color: 'white', textDecoration: 'none' }}>
          Terms & Conditions
        </a>{' '}
        |{' '}
        <a href="/privacy" style={{ color: 'white', textDecoration: 'none' }}>
          Privacy Policy
        </a>
      </Typography>
    </Box>
  );
}

export default Footer;
