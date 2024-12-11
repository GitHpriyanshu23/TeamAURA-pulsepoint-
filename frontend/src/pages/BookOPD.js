import React, { useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem, Grid } from '@mui/material';

function BookOPD() {
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    hospital: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
  });

  const hospitals = ['City Hospital', 'Global Medical Center', 'Sunrise Clinic'];
  const departments = ['Cardiology', 'Neurology', 'Orthopedics'];
  const doctors = ['Dr. John Doe', 'Dr. Jane Smith', 'Dr. Alice Brown'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment booked successfully at ${appointmentData.hospital}!`);
    // Replace with API call
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Book an OPD Appointment
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Patient Name */}
          <Grid item xs={12}>
            <TextField
              label="Patient Name"
              name="name"
              fullWidth
              value={appointmentData.name}
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
              value={appointmentData.hospital}
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

          {/* Select Department */}
          <Grid item xs={12}>
            <TextField
              select
              label="Department"
              name="department"
              fullWidth
              value={appointmentData.department}
              onChange={handleInputChange}
              required
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Select Doctor */}
          <Grid item xs={12}>
            <TextField
              select
              label="Doctor"
              name="doctor"
              fullWidth
              value={appointmentData.doctor}
              onChange={handleInputChange}
              required
            >
              {doctors.map((doc) => (
                <MenuItem key={doc} value={doc}>
                  {doc}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Preferred Date */}
          <Grid item xs={12}>
            <TextField
              label="Preferred Date"
              name="date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={appointmentData.date}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Preferred Time Slot */}
          <Grid item xs={12}>
            <TextField
              label="Preferred Time Slot"
              name="time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={appointmentData.time}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Book Appointment
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default BookOPD;
