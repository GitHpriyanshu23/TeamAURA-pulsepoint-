import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

const PrescriptionModal = ({ open, patient, onClose, onSubmit }) => {
  const [prescription, setPrescription] = useState('');

  const handleSubmit = () => {
    onSubmit(patient.id, prescription);
    setPrescription('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Prescription for {patient?.name}</DialogTitle>
      <DialogContent>
        <TextField
          label="Prescription"
          multiline
          rows={4}
          fullWidth
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrescriptionModal;
