import React, { useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem, Grid } from '@mui/material';

function ReserveBed() {
  const [reservationData, setReservationData] = useState({
    name: '',
    hospital: '',
    bedType: '',
    date: '',
  });

  const hospitals = ['City Hospital', 'Green Valley Hospital', 'Sunrise Medical Center'];
  const bedTypes = ['General', 'Semi-Private', 'Private', 'ICU', 'CCU'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData({ ...reservationData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Bed reserved successfully at ${reservationData.hospital}!`);
    // Replace with API call
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Reserve a Hospital Bed
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Patient Name */}
          <Grid item xs={12}>
            <TextField
              label="Patient Name"
              name="name"
              fullWidth
              value={reservationData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Select Hospital */}
          <Grid item xs={12}>
            <TextField
              select
              label="Select Hospital"
              name="hospital"
              fullWidth
              value={reservationData.hospital}
              onChange={handleInputChange}
              required
            >
              {hospitals.map((hospital) => (
                <MenuItem key={hospital} value={hospital}>
                  {hospital}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Select Bed Type */}
          <Grid item xs={12}>
            <TextField
              select
              label="Select Bed Type"
              name="bedType"
              fullWidth
              value={reservationData.bedType}
              onChange={handleInputChange}
              required
            >
              {bedTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Reservation Date */}
          <Grid item xs={12}>
            <TextField
              label="Reservation Date"
              name="date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={reservationData.date}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Reserve Bed
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default ReserveBed;
