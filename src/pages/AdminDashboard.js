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
import { People, Hotel, Inventory2, Description } from '@mui/icons-material';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url("/assets/hospital.jpg")', // Ensure correct image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: '70px 20px',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 'bold', mb: 2, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
        >
          Welcome to PulsePoint Admin Dashboard
        </Typography>
        <Typography
          variant="h6"
          sx={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)' }}
        >
          Manage all hospital operations from one place.
        </Typography>
      </Box>

      {/* Main Dashboard Features */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Manage OPD Queue */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={4}
              sx={{
                textAlign: 'center',
                padding: '20px',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <CardContent>
                <People style={{ fontSize: 60, color: '#757575' }} /> {/* Increased size */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Manage OPD Queue
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                  Monitor and manage OPD queues efficiently.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#212121', // Black
                    color: 'white',
                    '&:hover': { backgroundColor: '#424242' }, // Darker grey on hover
                  }}
                  onClick={() => navigate('/opd-queue')}
                >
                  Go to OPD Queue
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Bed Management */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={4}
              sx={{
                textAlign: 'center',
                padding: '20px',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <CardContent>
                <Hotel style={{ fontSize: 60, color: '#757575' }} /> {/* Increased size */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Bed Management
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                  Track and manage hospital bed availability.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#212121', // Black
                    color: 'white',
                    '&:hover': { backgroundColor: '#424242' }, // Darker grey on hover
                  }}
                  onClick={() => navigate('/bed-management')}
                >
                  Manage Beds
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Inventory Management */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={4}
              sx={{
                textAlign: 'center',
                padding: '20px',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <CardContent>
                <Inventory2 style={{ fontSize: 60, color: '#757575' }} /> {/* Increased size */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Inventory Management
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                  Monitor and manage hospital medicine stock.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#212121', // Black
                    color: 'white',
                    '&:hover': { backgroundColor: '#424242' }, // Darker grey on hover
                  }}
                  onClick={() => navigate('/inventory-management')}
                >
                  Manage Inventory
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Reservation History */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={4}
              sx={{
                textAlign: 'center',
                padding: '20px',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <CardContent>
                <Description style={{ fontSize: 60, color: '#757575' }} /> {/* Increased size */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Reservation History
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                  View details of all past bed reservations.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#212121', // Black
                    color: 'white',
                    '&:hover': { backgroundColor: '#424242' }, // Darker grey on hover
                  }}
                  onClick={() => navigate('/reservation-history')}
                >
                  View History
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AdminDashboard;
