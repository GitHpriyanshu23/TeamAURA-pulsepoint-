import React, { useEffect, useState } from 'react'; 
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { Button } from '@mui/material';

function QueueDashboard() {
  const [queueData, setQueueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ hospital: '', department: '' });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/queue/')
      .then((response) => {
        console.log('Queue Data:', response.data);
        setQueueData(response.data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching queue data:', error);
        setLoading(false);
      });
  }, []);

  
  const handleAdmit = (patientId) => {
    const bedId = prompt("Enter Bed ID to assign:");

    axios.post('http://127.0.0.1:8000/api/admit/', { patient_id: patientId, bed_id: bedId })
      .then((response) => {
        alert('Patient admitted successfully!');
        // Refresh the queue data after admission
        axios.get('http://127.0.0.1:8000/api/queue/')
          .then((res) => setQueueData(res.data))
          .catch((err) => console.error(err));
      })
      .catch((error) => {
        alert(error.response?.data?.error || 'Failed to admit patient.');
      });
  };

  const filteredQueueData = queueData.filter((item) => {
    return (
      (!filter.hospital || item.hospital === filter.hospital) &&
      (!filter.department || item.department === filter.department)
    );
  });

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Queue Management Dashboard
      </Typography>

      {/* Filter Controls */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <FormControl style={{ minWidth: 150 }}>
          <InputLabel>Filter by Hospital</InputLabel>
          <Select
            value={filter.hospital}
            onChange={(e) => setFilter({ ...filter, hospital: e.target.value })}
          >
            <MenuItem value="">All Hospitals</MenuItem>
            <MenuItem value="City Hospital">City Hospital</MenuItem>
            <MenuItem value="Global Medical Center">Global Medical Center</MenuItem>
            <MenuItem value="Sunrise Clinic">Sunrise Clinic</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ minWidth: 150 }}>
          <InputLabel>Filter by Department</InputLabel>
          <Select
            value={filter.department}
            onChange={(e) => setFilter({ ...filter, department: e.target.value })}
          >
            <MenuItem value="">All Departments</MenuItem>
            <MenuItem value="Cardiology">Cardiology</MenuItem>
            <MenuItem value="Neurology">Neurology</MenuItem>
            <MenuItem value="Orthopedics">Orthopedics</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Queue Table */}
      {filteredQueueData.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Gender</strong></TableCell>
              <TableCell><strong>Age</strong></TableCell>
              <TableCell><strong>Hospital</strong></TableCell>
              <TableCell><strong>Department</strong></TableCell>
              <TableCell><strong>Criticalness</strong></TableCell>
              <TableCell><strong>Symptoms</strong></TableCell>
              <TableCell><strong>Arrival Time</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQueueData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>{item.hospital}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{item.criticalness}</TableCell>
                <TableCell>{item.symptoms}</TableCell>
                <TableCell>{new Date(item.arrival_time).toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAdmit(item.id)}
                  >
                    Admit Patient
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography align="center">No patients in the queue.</Typography>
      )}
    </Container>
  );
}

export default QueueDashboard;
