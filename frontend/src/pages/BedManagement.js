import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';
import axios from 'axios';

function BedManagement() {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBed, setNewBed] = useState({ bed_id: '', type: '', is_available: true });

  // Fetch beds from API
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/beds/')
      .then((response) => {
        setBeds(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching beds:', error);
        setLoading(false);
      });
  }, []);

  // Add a new bed
  const handleAddBed = () => {
    if (!newBed.bed_id || !newBed.type) {
      alert('Please fill in all fields for the new bed.');
      return;
    }
    axios
      .post('http://127.0.0.1:8000/api/beds/', newBed)
      .then((response) => {
        setBeds([...beds, response.data]);
        setNewBed({ bed_id: '', type: '', is_available: true });
        alert('Bed added successfully!');
      })
      .catch((error) => {
        console.error('Error adding bed:', error);
        alert('Failed to add bed. Please try again.');
      });
  };

  // Toggle bed availability
  const toggleAvailability = (bedId) => {
    axios
      .patch(`http://127.0.0.1:8000/api/beds/${bedId}/`, { is_available: false })
      .then((response) => {
        const updatedBeds = beds.map((bed) =>
          bed.bed_id === bedId ? { ...bed, is_available: !bed.is_available } : bed
        );
        setBeds(updatedBeds);
      })
      .catch((error) => {
        console.error('Error updating bed availability:', error);
        alert('Failed to update bed availability.');
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Bed Management
      </Typography>

      {/* Add New Bed */}
      <div style={{ marginBottom: '20px' }}>
        <Typography variant="h6">Add New Bed</Typography>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <TextField
            label="Bed ID"
            value={newBed.bed_id}
            onChange={(e) => setNewBed({ ...newBed, bed_id: e.target.value })}
          />
          <FormControl style={{ minWidth: 150 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={newBed.type}
              onChange={(e) => setNewBed({ ...newBed, type: e.target.value })}
            >
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="icu">ICU</MenuItem>
              <MenuItem value="special">Special</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleAddBed}>
            Add Bed
          </Button>
        </div>
      </div>

      {/* Display Beds */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Bed ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Availability</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {beds.map((bed) => (
            <TableRow key={bed.bed_id}>
              <TableCell>{bed.bed_id}</TableCell>
              <TableCell>{bed.type}</TableCell>
              <TableCell>{bed.is_available ? 'Available' : 'Occupied'}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color={bed.is_available ? 'success' : 'error'}
                  onClick={() => toggleAvailability(bed.bed_id)}
                >
                  {bed.is_available ? 'Mark as Occupied' : 'Mark as Available'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default BedManagement;
