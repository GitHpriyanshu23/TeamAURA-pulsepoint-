import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

function PatientSignUp() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Replace with your API call
    setSuccessMessage('Account created successfully! Redirecting to login...');
    setTimeout(() => navigate('/patient-login'), 2000);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '40px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Patient Sign Up
      </Typography>
      <Box component="form" noValidate autoComplete="off" style={{ marginTop: '20px' }} onSubmit={handleSignUp}>
        <TextField
          label="Full Name"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          required
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
          type="submit"
        >
          Sign Up
        </Button>
        {successMessage && (
          <Alert severity="success" style={{ marginTop: '20px' }}>
            {successMessage}
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default PatientSignUp;
