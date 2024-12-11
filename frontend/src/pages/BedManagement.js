import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';

function BedManagement() {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '', roomType: '', search: '' });

  const roomTypes = ['General Ward', 'ICU', 'Private Room'];
  const bedStatuses = ['Available', 'Occupied'];

  // Simulated data fetching
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setBeds([
        { id: 'B001', roomType: 'ICU', status: 'Occupied', patientName: 'John Doe', doctor: 'Dr. Smith' },
        { id: 'B002', roomType: 'General Ward', status: 'Available', patientName: '', doctor: '' },
        { id: 'B003', roomType: 'Private Room', status: 'Occupied', patientName: 'Alice Brown', doctor: 'Dr. Brown' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  
  const filteredBeds = beds.filter((bed) => {
    return (
      (filters.status === '' || bed.status === filters.status) &&
      (filters.roomType === '' || bed.roomType === filters.roomType) &&
      (filters.search === '' || bed.id.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  
  const markAvailable = (id) => {
    setBeds(
      beds.map((bed) =>
        bed.id === id ? { ...bed, status: 'Available', patientName: '', doctor: '' } : bed
      )
    );
    alert(`Bed ${id} is now available.`);
  };

  const assignBed = (id) => {
    const patientName = prompt('Enter patient name:');
    const doctor = prompt('Enter assigned doctor:');
    if (patientName && doctor) {
      setBeds(
        beds.map((bed) =>
          bed.id === id ? { ...bed, status: 'Occupied', patientName, doctor } : bed
        )
      );
      alert(`Bed ${id} has been assigned to ${patientName} under ${doctor}.`);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, fontFamily: 'Poppins' }}>
        Bed Management
      </Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <TextField
          label="Search by Bed ID"
          name="search"
          variant="outlined"
          value={filters.search}
          onChange={handleFilterChange}
          sx={{ width: '30%' }}
        />
        <FormControl sx={{ width: '30%' }}>
          <InputLabel>Room Type</InputLabel>
          <Select
            name="roomType"
            value={filters.roomType}
            onChange={handleFilterChange}
            label="Room Type"
          >
            <MenuItem value="">All</MenuItem>
            {roomTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: '30%' }}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            {bedStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Bed Table */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Bed ID</strong></TableCell>
                <TableCell><strong>Room Type</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Patient Name</strong></TableCell>
                <TableCell><strong>Doctor</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBeds.map((bed) => (
                <TableRow key={bed.id}>
                  <TableCell>{bed.id}</TableCell>
                  <TableCell>{bed.roomType}</TableCell>
                  <TableCell>{bed.status}</TableCell>
                  <TableCell>{bed.patientName || 'N/A'}</TableCell>
                  <TableCell>{bed.doctor || 'N/A'}</TableCell>
                  <TableCell>
                    {bed.status === 'Occupied' ? (
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => markAvailable(bed.id)}
                      >
                        Mark Available
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => assignBed(bed.id)}
                      >
                        Assign
                      </Button>
                    )}
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

export default BedManagement;
