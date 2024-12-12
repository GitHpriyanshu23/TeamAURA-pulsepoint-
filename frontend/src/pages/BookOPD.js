import React, { useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem, Grid } from '@mui/material';
import axios from 'axios';

function BookOPD() {
  const [appointmentData, setAppointmentData] = useState({
    aadharNumber: '',
    name: '', 
    gender: '',
    age: '',
    mobile: '',
    hospital: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
    symptoms: '',
    criticalness: 'non-critical',
  });

  const hospitals = ['City Hospital', 'Global Medical Center', 'Sunrise Clinic'];
  const departments = ['Cardiology', 'Neurology', 'Orthopedics'];
  const doctors = ['Priyanshu', 'Shreyansh', 'Aanchal'];

  const mockAadharData = {
    '503981419995': {
      name: 'Shreyansh Mahule',
      gender: 'Male',
      age: '19',
      mobile: '9109322676',
    },
    '987654321098': {
      name: 'Aanchal',
      gender: 'Female',
      age: '28',
      mobile: '8765432109',
    },
    '456789123456': {
      name: 'Pushkar',
      gender: 'Female',
      age: '40',
      mobile: '7654321098',
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const fetchPatientDetails = () => {
    const data = mockAadharData[appointmentData.aadharNumber];
    if (data) {
      setAppointmentData((prev) => ({
        ...prev,
        name: data.name || '',
        gender: data.gender || '',
        age: data.age || '',
        mobile: data.mobile || '',
      }));
      alert('Patient details fetched successfully!');
    } else {
      alert('No details found for the entered Aadhaar number.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/queue/', {
        ...appointmentData,
        arrival_time: new Date().toISOString(),
      });
      alert(`Appointment booked successfully and added to the queue!`);
      setAppointmentData({
        aadharNumber: '',
        name: '',
        gender: '',
        age: '',
        mobile: '',
        hospital: '',
        department: '',
        doctor: '',
        date: '',
        time: '',
        symptoms: '',
        criticalness: 'non-critical',
      });
    } catch (err) {
      console.error('Error booking appointment:', err);
      alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Book an OPD Appointment
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Aadhaar Number */}
          <Grid item xs={12}>
            <TextField
              label="Aadhaar Number"
              name="aadharNumber"
              fullWidth
              value={appointmentData.aadharNumber}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: '10px' }}
              onClick={fetchPatientDetails}
            >
              Fetch Details
            </Button>
          </Grid>

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

          {/* Gender */}
          <Grid item xs={12}>
            <TextField
              select
              label="Gender"
              name="gender"
              fullWidth
              value={appointmentData.gender}
              onChange={(e) =>
                setAppointmentData({ ...appointmentData, gender: e.target.value })
            }
              required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Grid>

          {/* Age */}
          <Grid item xs={12}>
            <TextField
              label="Age"
              name="age"
              type="number"
              fullWidth
              value={appointmentData.age}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Mobile Number */}
          <Grid item xs={12}>
            <TextField
              label="Mobile Number"
              name="mobile"
              type="tel"
              fullWidth
              value={appointmentData.mobile}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Hospital */}
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

          {/* Department */}
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

          {/* Doctor */}
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

          {/* Symptoms */}
          <Grid item xs={12}>
            <TextField
              label="Symptoms"
              name="symptoms"
              fullWidth
              value={appointmentData.symptoms}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Criticalness */}
          <Grid item xs={12}>
            <TextField
              select
              label="Criticalness"
              name="criticalness"
              fullWidth
              value={appointmentData.criticalness}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="critical">Critical</MenuItem>
              <MenuItem value="non-critical">Non-Critical</MenuItem>
            </TextField>
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
