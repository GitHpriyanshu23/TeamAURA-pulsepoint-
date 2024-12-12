import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';

function OPDQueue() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ department: '', doctor: '', search: '' });
  const [newPatient, setNewPatient] = useState({
    aadharNumber: '',
    name: '',
    age: '',
    department: '',
    doctor: '',
    medicalHistory: '',
  });


  const departments = ['Cardiology', 'Neurology', 'Orthopedics'];
  const doctors = ['Priyanshu', 'Aanchal', 'Shreyansh'];

  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setQueue([
        { id: 1, name: 'Priyanshu Urmaliya', age: 45, department: 'Cardiology', doctor: 'Priyanshu', time: '10:30 AM' },
        { id: 2, name: 'Shreyansh', age: 30, department: 'Neurology', doctor: 'Shreyansh', time: '11:00 AM' },
        { id: 3, name: 'aachanal', age: 35, department: 'Orthopedics', doctor: 'Dr. Aanchal', time: '11:30 AM' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  
  const handleMarkServed = (id) => {
    setQueue(queue.filter((patient) => patient.id !== id));
    alert('Patient marked as served!');
  };

  
  const handleRemove = (id) => {
    setQueue(queue.filter((patient) => patient.id !== id));
    alert('Patient removed from the queue!');
  };

  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  
  const filteredQueue = queue.filter((patient) => {
    return (
      (filters.department === '' || patient.department === filters.department) &&
      (filters.doctor === '' || patient.doctor === filters.doctor) &&
      (filters.search === '' || patient.name.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  
  const fetchPatientDetails = async () => {
    try {
      const response = await fetch('/mockAadharData.json');
      if (!response.ok) {
        throw new Error('Failed to fetch Aadhaar data.');
      }
      const data = await response.json();
  
      const patientData = data[newPatient.aadharNumber];
      if (patientData) {
        setNewPatient((prev) => ({
          ...prev,
          name: patientData.name,
          age: patientData.age,
          medicalHistory: patientData.medicalHistory,
        }));
        alert('Patient details fetched successfully!');
      } else {
        alert('No details found for the entered Aadhaar number.');
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
      alert('Failed to fetch patient details. Please try again.');
    }
  };
  

  
  const addToQueue = () => {
    if (newPatient.name && newPatient.department && newPatient.doctor) {
      setQueue((prevQueue) => [
        ...prevQueue,
        { id: queue.length + 1, ...newPatient, time: new Date().toLocaleTimeString() },
      ]);
      setNewPatient({ aadharNumber: '', name: '', age: '', department: '', doctor: '', medicalHistory: '' });
      alert('Patient added to OPD queue successfully!');
    } else {
      alert('Please fill in all required details.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, fontFamily: 'Poppins' }}>
        OPD Queue Management
      </Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <TextField
          label="Search by Name"
          name="search"
          variant="outlined"
          value={filters.search}
          onChange={handleFilterChange}
          sx={{ width: '30%' }}
        />
        <FormControl sx={{ width: '30%' }}>
          <InputLabel>Department</InputLabel>
          <Select
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            label="Department"
          >
            <MenuItem value="">All</MenuItem>
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: '30%' }}>
          <InputLabel>Doctor</InputLabel>
          <Select
            name="doctor"
            value={filters.doctor}
            onChange={handleFilterChange}
            label="Doctor"
          >
            <MenuItem value="">All</MenuItem>
            {doctors.map((doc) => (
              <MenuItem key={doc} value={doc}>
                {doc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Add New Patient Section */}
      <Box sx={{ mb: 4, p: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
        <Typography variant="h5" gutterBottom>
          Add New Patient
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Aadhaar Number"
              fullWidth
              value={newPatient.aadharNumber}
              onChange={(e) => setNewPatient({ ...newPatient, aadharNumber: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" color="primary" fullWidth onClick={fetchPatientDetails}>
              Fetch Patient Details
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Patient Name"
              fullWidth
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Age"
              type="number"
              fullWidth
              value={newPatient.age}
              onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                value={newPatient.department}
                onChange={(e) => setNewPatient({ ...newPatient, department: e.target.value })}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Doctor</InputLabel>
              <Select
                value={newPatient.doctor}
                onChange={(e) => setNewPatient({ ...newPatient, doctor: e.target.value })}
              >
                {doctors.map((doc) => (
                  <MenuItem key={doc} value={doc}>
                    {doc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Medical History"
              fullWidth
              value={newPatient.medicalHistory}
              onChange={(e) => setNewPatient({ ...newPatient, medicalHistory: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" fullWidth onClick={addToQueue}>
              Add to OPD Queue
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Queue Table */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Age</strong></TableCell>
                <TableCell><strong>Department</strong></TableCell>
                <TableCell><strong>Doctor</strong></TableCell>
                <TableCell><strong>Time</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredQueue.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.department}</TableCell>
                  <TableCell>{patient.doctor}</TableCell>
                  <TableCell>{patient.time}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ mr: 2 }}
                      onClick={() => handleMarkServed(patient.id)}
                    >
                      Mark as Served
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleRemove(patient.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default OPDQueue;