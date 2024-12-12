import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
} from '@mui/material';

const ReservationHistory = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Simulated API call to fetch reservation data
    const fetchReservations = async () => {
      const data = [
        { id: 1, patientName: 'Pushkar urode', bedType: 'ICU', date: '2024-12-01', status: 'Confirmed' },
        { id: 2, patientName: 'bhuti bhushan', bedType: 'Private', date: '2024-12-03', status: 'Pending' },
        { id: 3, patientName: 'priyanshu', bedType: 'General', date: '2024-12-05', status: 'Cancelled' },
      ];
      setReservations(data);
    };
    fetchReservations();
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Reservation History
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Bed Type</TableCell>
              <TableCell>Reservation Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.id}</TableCell>
                <TableCell>{reservation.patientName}</TableCell>
                <TableCell>{reservation.bedType}</TableCell>
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => alert(`Managing reservation ${reservation.id}`)}
                  >
                    Manage
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ReservationHistory;
