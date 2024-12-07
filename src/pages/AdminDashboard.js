import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { People, Hotel, Inventory, History } from '@mui/icons-material';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" style={{ marginTop: '40px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" align="center" style={{ marginBottom: '30px' }}>
        Manage all hospital operations efficiently with the modules below.
      </Typography>
      <Grid container spacing={4}>
        {/* OPD Queue Management */}
        <Grid item xs={12} md={4}>
          <Card elevation={4}>
            <CardContent>
              <Box display="flex" alignItems="center" marginBottom="16px">
                <People style={{ fontSize: 40, color: '#1976d2', marginRight: '10px' }} />
                <Typography variant="h6">OPD Queue Management</Typography>
              </Box>
              <Typography color="textSecondary" style={{ marginBottom: '16px' }}>
                Manage and monitor OPD queues to ensure smooth operations.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate('/opd-queue')}
              >
                Manage OPD
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Bed Management */}
        <Grid item xs={12} md={4}>
          <Card elevation={4}>
            <CardContent>
              <Box display="flex" alignItems="center" marginBottom="16px">
                <Hotel style={{ fontSize: 40, color: '#1976d2', marginRight: '10px' }} />
                <Typography variant="h6">Bed Management</Typography>
              </Box>
              <Typography color="textSecondary" style={{ marginBottom: '16px' }}>
                Track and manage hospital bed availability and assignments.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate('/bed-management')}
              >
                Manage Beds
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Inventory Management */}
        <Grid item xs={12} md={4}>
          <Card elevation={4}>
            <CardContent>
              <Box display="flex" alignItems="center" marginBottom="16px">
                <Inventory style={{ fontSize: 40, color: '#1976d2', marginRight: '10px' }} />
                <Typography variant="h6">Inventory Management</Typography>
              </Box>
              <Typography color="textSecondary" style={{ marginBottom: '16px' }}>
                Monitor and manage medicine stock and inventory levels.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate('/inventory-management')}
              >
                Manage Inventory
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Reservation History */}
        <Grid item xs={12} md={4}>
          <Card elevation={4}>
            <CardContent>
              <Box display="flex" alignItems="center" marginBottom="16px">
                <History style={{ fontSize: 40, color: '#1976d2', marginRight: '10px' }} />
                <Typography variant="h6">Reservation History</Typography>
              </Box>
              <Typography color="textSecondary" style={{ marginBottom: '16px' }}>
                View and manage all bed reservation requests.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate('/reservation-history')}
              >
                View History
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminDashboard;
