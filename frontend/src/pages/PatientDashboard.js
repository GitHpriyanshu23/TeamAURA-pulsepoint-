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
import { EventNote, Hotel, LocalHospital, Description, Payment } from '@mui/icons-material';

function PatientDashboard() {
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
          sx={{ fontWeight: 'bold', mb: 2 , color:'black'}}
        >
          Welcome to PulsePoint Patient Dashboard
        </Typography>
        <Typography
          variant="h6"
          sx={{ mb: 2, color: 'black' }}
        >
          Access all your healthcare services from one place.
        </Typography>
      </Box>

      {/* Main Dashboard Features */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Book Appointment */}
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
                <EventNote style={{ fontSize: 60, color: '#757575' }} /> {/* Increased size */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Book an Appointment
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                  Schedule an appointment with a doctor for OPD services.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#212121', // Black
                    color: 'white',
                    '&:hover': { backgroundColor: '#424242' }, // Darker grey on hover
                  }}
                  onClick={() => navigate('/book-opd')}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Reserve Bed */}
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
                  Reserve a Bed
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                  Book a hospital bed in advance for inpatient care.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#212121', // Black
                    color: 'white',
                    '&:hover': { backgroundColor: '#424242' }, // Darker grey on hover
                  }}
                  onClick={() => navigate('/reserve-bed')}
                >
                  Reserve Bed
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Emergency Connect */}
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
                <LocalHospital style={{ fontSize: 60, color: '#ff1744' }} /> {/* Increased size */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Emergency Connect
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                  Call an ambulance to your location immediately.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#ff1744', // Emergency Red
                    color: 'white',
                    '&:hover': { backgroundColor: '#d50000' }, // Darker red on hover
                  }}
                  onClick={() => (window.location.href = '/emergency.html')}
                >
                  Emergency Connect
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Medical Reports */}
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
                  Medical Reports
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                  View and download your medical reports with ease.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#212121', // Black
                    color: 'white',
                    '&:hover': { backgroundColor: '#424242' }, // Darker grey on hover
                  }}
                  onClick={() => navigate('/medical-reports')}
                >
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Payment Gateway */}
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
                <Payment style={{ fontSize: 60, color: '#4caf50' }} /> {/* Increased size */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Payment Gateway
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                  Make secure payments for your medical services.
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#4caf50', // Green
                    color: 'white',
                    '&:hover': { backgroundColor: '#388e3c' }, // Darker green on hover
                  }}
                  onClick={() => window.open('https://stripe-payments-demo.appspot.com/', '_blank')}
                >
                  Make Payment
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PatientDashboard;