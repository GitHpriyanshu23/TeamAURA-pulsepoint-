import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PatientLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulated patient login logic (replace with API)
    if (credentials.email === 'patient@example.com' && credentials.password === 'password') {
      localStorage.setItem('role', 'patient');
      navigate('/patient-dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '100px' }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Patient Login
          </Typography>
          {error && (
            <Alert severity="error" style={{ marginBottom: '16px' }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '20px' }}
            >
              Login
            </Button>
          </form>
          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Don’t have an account?{' '}
              <Button
                variant="text"
                color="primary"
                onClick={() => navigate('/patient-signup')}
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default PatientLogin;
