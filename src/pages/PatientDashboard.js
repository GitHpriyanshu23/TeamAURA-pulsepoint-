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
import { EventNote, Hotel, LocalHospital } from '@mui/icons-material';

function PatientDashboard() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" style={{ marginTop: '40px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Patient Dashboard
      </Typography>
      <Typography variant="body1" align="center" style={{ marginBottom: '30px' }}>
        Access all your healthcare services from one place.
      </Typography>
      <Grid container spacing={4}>
        {/* Book Appointment */}
        <Grid item xs={12} md={4}>
          <Card elevation={4}>
            <CardContent>
              <Box display="flex" alignItems="center" marginBottom="16px">
                <EventNote style={{ fontSize: 40, color: '#4caf50', marginRight: '10px' }} />
                <Typography variant="h6">Book an Appointment</Typography>
              </Box>
              <Typography color="textSecondary" style={{ marginBottom: '16px' }}>
                Schedule an appointment with a doctor for OPD services.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate('/book-opd')}
              >
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Reserve Bed */}
<Grid item xs={12} md={4}>
  <Card elevation={4}>
    <CardContent>
      <Box display="flex" alignItems="center" marginBottom="16px">
        <Hotel style={{ fontSize: 40, color: '#4caf50', marginRight: '10px' }} />
        <Typography variant="h6">Reserve a Bed</Typography>
      </Box>
      <Typography color="textSecondary" style={{ marginBottom: '16px' }}>
        Book a hospital bed in advance for inpatient care.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => navigate('/reserve-bed')} // Navigate to Reserve Bed page
      >
        Reserve Bed
      </Button>
    </CardContent>
  </Card>
</Grid>

        {/* Emergency Connect */}
        <Grid item xs={12} md={4}>
          <Card elevation={4}>
            <CardContent>
              <Box display="flex" alignItems="center" marginBottom="16px">
                <LocalHospital style={{ fontSize: 40, color: '#4caf50', marginRight: '10px' }} />
                <Typography variant="h6">Emergency Connect</Typography>
              </Box>
              <Typography color="textSecondary" style={{ marginBottom: '16px' }}>
                Call an ambulance to your location immediately.
              </Typography>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => alert('Emergency ambulance booked!')}
              >
                Emergency Connect
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PatientDashboard;
