import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Import the local image
import pulsepointLogo from '../assets/images/pulsepoint-logo.jpg';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      style={{
        height: '750px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <img 
        src={pulsepointLogo} 
        alt="PulsePoint Logo" 
        style={{ marginBottom: '30px', width: '300px', height: 'auto' }}
      />
      
      <Typography variant="h4" gutterBottom>
        Welcome to PulsePoint, A Hospital Management System
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Please log in to continue or explore our training opportunities.
      </Typography>
      <Box mt={4} display="flex" gap={2} flexWrap="wrap" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ px: 4, py: 2, fontSize: '1.25rem' }}
          onClick={() => navigate('/patient-login')}
        >
          Patient Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ px: 4, py: 2, fontSize: '1.25rem' }}
          onClick={() => navigate('/admin-login')}
        >
          Admin Login
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{ px: 4, py: 2, fontSize: '1.25rem', backgroundColor: '#6a1b9a', color: '#fff' }}
          onClick={() => window.open('https://www.icmr.gov.in/', '_blank')}
        >
          Training Gateway
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{ px: 4, py: 2, fontSize: '1.25rem', backgroundColor: '#007BFF', color: '#fff' }}
          onClick={() => window.open('https://ors.gov.in/healthid/index.jsp?NICSecurityORS=511O-T75B-O07Z-CC1R-5SR1-25QA-T0ZQ-VSSS', '_blank')}
        >
          Create ABHA (Health ID)
        </Button>
      </Box>
    </Container>
  );
}

export default LandingPage;