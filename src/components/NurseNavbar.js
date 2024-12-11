import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Home, ExitToApp, Assignment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NurseNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/'); // Redirect to landing page or login
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#4caf50' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          style={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/nurse-panel')}
        >
          Nurse Dashboard
        </Typography>

        <IconButton
          color="inherit"
          onClick={() => navigate('/nurse-panel')}
          title="Home"
        >
          <Home />
        </IconButton>

        <Button
          color="inherit"
          startIcon={<Assignment />}
          onClick={() => navigate('/bed-management')} // Example path
        >
          Bed Management
        </Button>

        <Button
          color="inherit"
          startIcon={<Assignment />}
          onClick={() => navigate('/inventory-management')} // Example path
        >
          Inventory
        </Button>

        <Button
          color="inherit"
          startIcon={<ExitToApp />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NurseNavbar;
