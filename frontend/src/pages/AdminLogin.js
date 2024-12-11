import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '', role: 'admin' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulated multi-level login logic (replace with API)
    const { email, password, role } = credentials;
    if (
      (email === 'admin@example.com' && password === 'password' && role === 'admin') ||
      (email === 'doctor@example.com' && password === 'password' && role === 'doctor') ||
      (email === 'nurse@example.com' && password === 'password' && role === 'nurse')
    ) {
      localStorage.setItem('role', role);
      if (role === 'admin') navigate('/admin-dashboard');
      if (role === 'doctor') navigate('/doctor-panel');
      if (role === 'nurse') navigate('/nurse-panel');
    } else {
      setError('Invalid email, password, or role');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '100px' }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Hospital Staff Login
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
            <TextField
              label="Role"
              name="role"
              select
              fullWidth
              margin="normal"
              value={credentials.role}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
              <MenuItem value="nurse">Nurse</MenuItem>
            </TextField>
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
        </CardContent>
      </Card>
    </Container>
  );
}

export default AdminLogin;
