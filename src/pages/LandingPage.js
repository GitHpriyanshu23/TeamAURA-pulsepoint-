import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to PulsePoint, A Hospital Management System
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Please log in to continue.
      </Typography>
      <Box mt={4} display="flex" gap={2}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/patient-login')}
        >
          Patient Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate('/admin-login')}
        >
          Admin Login
        </Button>
      </Box>
    </Container>
  );
}

export default LandingPage;
