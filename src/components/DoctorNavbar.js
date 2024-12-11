import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function DoctorNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    navigate('/doctor-login'); // Redirect to doctor login page after logout
  };

  return (
    <AppBar position="static" style={{ background: '#1976d2' }}>
      <Toolbar>
        <Typography
          variant="h6"
          style={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/doctor-panel')}
        >
          Doctor Dashboard
        </Typography>
        <Button color="inherit" onClick={() => navigate('/doctor-panel')}>
          Home
        </Button>
        <Button color="inherit" onClick={() => navigate('/opd-queue')}>
          OPD Queue
        </Button>
        <Button color="inherit" onClick={() => navigate('/medical-reports')}>
          Medical Reports
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default DoctorNavbar;
