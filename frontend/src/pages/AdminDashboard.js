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
import { People, Hotel, Inventory2, Description, Delete, Build } from '@mui/icons-material';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#f0f4f8',
          padding: '70px 20px',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}
        >
          Welcome to PulsePoint Admin Dashboard
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: 'black', mb: 2 }}
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
                <People style={{ fontSize: 60, color: '#757575' }} />
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
                    '&:hover': { backgroundColor: '#424242' },
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
                <Hotel style={{ fontSize: 60, color: '#757575' }} />
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
                    backgroundColor: '#212121',
                    color: 'white',
                    '&:hover': { backgroundColor: '#424242' },
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
                <Inventory2 style={{ fontSize: 60, color: '#757575' }} />
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
                    backgroundColor: '#212121',
                    color: 'white',
                    '&:hover': { backgroundColor: '#424242' },
                  }}
                  onClick={() => {
                    window.location.href = 'http://127.0.0.1:8000/admin/inventory/'; // Update with the correct URL
                  }}
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
                <Description style={{ fontSize: 60, color: '#757575' }} />
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
                    backgroundColor: '#212121',
                    color: 'white',
                    '&:hover': { backgroundColor: '#424242' },
                  }}
                  onClick={() => navigate('/reservation-history')}
                >
                  View History
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Waste Management */}
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
                <Delete style={{ fontSize: 60, color: '#757575' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Waste Management
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                  Manage hospital waste efficiently.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#212121',
                    color: 'white',
                    '&:hover': { backgroundColor: '#424242' },
                  }}
                  onClick={() => navigate('/waste-management')}
                >
                  Manage Waste
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Queue Dashboard */}
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
                <People style={{ fontSize: 60, color: '#757575' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Queue Dashboard
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                  Monitor and manage all hospital queues in one place.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#212121',
                    color: 'white',
                    '&:hover': { backgroundColor: '#424242' },
                  }}
                  onClick={() => navigate('/queue-dashboard')}
                >
                  Go to Queue Dashboard
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Hospital Integration */}
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
                <Build style={{ fontSize: 60, color: '#757575' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Hospital Integration
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                  Integrate external hospital systems and manage data exchanges.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#212121',
                    color: 'white',
                    '&:hover': { backgroundColor: '#424242' },
                  }}
                  onClick={() => navigate('/hospital-integration')}
                >
                  Integrate Hospital Systems
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