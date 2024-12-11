import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/pulsepoint.png'; // Ensure the path is correct

function AdminNavbar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken'); // Clear admin authentication token
    navigate('/admin-login'); // Redirect to Admin Login
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { text: 'Dashboard', path: '/admin-dashboard' },
    { text: 'Beds', path: '/bed-management' },
    { text: 'OPD Queue', path: '/opd-queue' },
    { text: 'Inventory', path: '/inventory-management' },
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#333' }}>
        <Toolbar>
          {/* Logo and Title */}
          <Box display="flex" alignItems="center" flexGrow={1}>
            <img
              src={logo}
              alt="PulsePoint Logo"
              style={{ width: '40px', height: '40px', marginRight: '10px', cursor: 'pointer' }}
              onClick={() => navigate('/admin-dashboard')}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 'bold', color: '#fff', cursor: 'pointer' }}
              onClick={() => navigate('/admin-dashboard')}
            >
              PulsePoint Admin
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  color: '#fff',
                  marginLeft: '15px',
                  '&:hover': { color: '#4caf50' },
                }}
              >
                {item.text}
              </Button>
            ))}
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                color: '#fff',
                marginLeft: '15px',
                '&:hover': { color: '#e91e63' },
              }}
            >
              Logout
            </Button>
          </Box>

          {/* Mobile Navigation */}
          <IconButton
            edge="start"
            color="inherit"
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          width={250}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          sx={{ backgroundColor: '#333', color: '#fff' }}
        >
          <List>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{ '&:hover': { backgroundColor: '#444' } }}
              >
                <ListItemText primary={item.text} sx={{ color: '#fff' }} />
              </ListItem>
            ))}
            <ListItem
              button
              onClick={handleLogout}
              sx={{ '&:hover': { backgroundColor: '#444' } }}
            >
              <ListItemText primary="Logout" sx={{ color: '#e91e63' }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default AdminNavbar;
