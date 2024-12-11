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

function OpdQueue() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ department: '', doctor: '', search: '' });

  // Sample Departments and Doctors for Filter
  const departments = ['Cardiology', 'Neurology', 'Orthopedics'];
  const doctors = ['Dr. John Doe', 'Dr. Jane Smith', 'Dr. Alice Brown'];

  // Fetch Queue Data (Simulated with timeout)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setQueue([
        { id: 1, name: 'John Doe', age: 45, department: 'Cardiology', doctor: 'Dr. John Doe', time: '10:30 AM' },
        { id: 2, name: 'Jane Smith', age: 30, department: 'Neurology', doctor: 'Dr. Jane Smith', time: '11:00 AM' },
        { id: 3, name: 'Alice Brown', age: 35, department: 'Orthopedics', doctor: 'Dr. Alice Brown', time: '11:30 AM' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle Mark as Served
  const handleMarkServed = (id) => {
    setQueue(queue.filter((patient) => patient.id !== id));
    alert('Patient marked as served!');
  };

  // Handle Remove from Queue
  const handleRemove = (id) => {
    setQueue(queue.filter((patient) => patient.id !== id));
    alert('Patient removed from the queue!');
  };

  // Handle Search and Filter
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

export default OpdQueue;
