import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Alert,
} from '@mui/material';

const ReserveBed = () => {
  const [bedType, setBedType] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [availableBeds, setAvailableBeds] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Simulated API call to fetch bed availability
    const fetchBeds = async () => {
      const data = [
        { id: 1, type: 'General', available: 10 },
        { id: 2, type: 'ICU', available: 5 },
        { id: 3, type: 'Private', available: 3 },
      ];
      setAvailableBeds(data);
    };
    fetchBeds();
  }, []);

  const handleReserve = () => {
    setOpenDialog(false);
    setSuccessMessage(`Bed reserved successfully! Type: ${bedType}, Date: ${reservationDate}`);
    setBedType('');
    setReservationDate('');
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Reserve Bed
      </Typography>
      <form>
        <FormControl fullWidth margin="normal">
          <InputLabel id="bed-type-label">Bed Type</InputLabel>
          <Select
            labelId="bed-type-label"
            value={bedType}
            onChange={(e) => setBedType(e.target.value)}
          >
            {availableBeds.map((bed) => (
              <MenuItem key={bed.id} value={bed.type}>
                {bed.type} (Available: {bed.available})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Reservation Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="normal"
          value={reservationDate}
          onChange={(e) => setReservationDate(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
          onClick={() => setOpenDialog(true)}
        >
          Reserve Bed
        </Button>
      </form>

      {successMessage && (
        <Alert severity="success" style={{ marginTop: '20px' }}>
          {successMessage}
        </Alert>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Reservation</DialogTitle>
        <Typography style={{ margin: '16px' }}>
          Are you sure you want to reserve a {bedType} bed for {reservationDate}?
        </Typography>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleReserve} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ReserveBed;
