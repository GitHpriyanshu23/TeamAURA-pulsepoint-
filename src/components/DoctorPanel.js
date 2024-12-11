import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Button,
  Avatar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Alert,
  Grow,
  Fade,
  Slide,
} from '@mui/material';
import { Add, Delete, Event, History, LocalHospital } from '@mui/icons-material';

const DoctorPanel = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [openPrescriptionDialog, setOpenPrescriptionDialog] = useState(false);

  useEffect(() => {
    const mockPatients = [
      {
        id: 1,
        name: 'John Doe',
        age: 30,
        condition: 'Flu',
        status: 'Stable',
        lastVisit: '2023-12-05',
        appointmentTime: '10:00 AM',
      },
      {
        id: 2,
        name: 'Jane Smith',
        age: 45,
        condition: 'Diabetes',
        status: 'Critical',
        lastVisit: '2023-11-20',
        appointmentTime: '11:30 AM',
      },
      {
        id: 3,
        name: 'Samuel Brown',
        age: 65,
        condition: 'Hypertension',
        status: 'Stable',
        lastVisit: '2023-12-01',
        appointmentTime: '2:00 PM',
      },
    ];
    setTimeout(() => {
      setPatients(mockPatients);
    }, 500);
  }, []);

  const handlePrescribe = (patient) => {
    setSelectedPatient(patient);
    setPrescriptions([{ drug: '', dosage: '', notes: '' }]);
    setOpenPrescriptionDialog(true);
  };

  const handleClearOPD = (patientId) => {
    setPatients((prevPatients) =>
      prevPatients.filter((patient) => patient.id !== patientId)
    );
    setAlertMessage('Patient cleared from OPD.');
  };

  const handleAdmitPatient = (patientId) => {
    setPatients((prevPatients) =>
      prevPatients.filter((patient) => patient.id !== patientId)
    );
    setAlertMessage('Patient admitted to the hospital.');
  };

  const handleAddPrescription = () => {
    setPrescriptions((prev) => [...prev, { drug: '', dosage: '', notes: '' }]);
  };

  const handleRemovePrescription = (index) => {
    setPrescriptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePrescriptionChange = (index, field, value) => {
    setPrescriptions((prev) =>
      prev.map((prescription, i) =>
        i === index ? { ...prescription, [field]: value } : prescription
      )
    );
  };

  const handlePrescriptionSubmit = () => {
    if (prescriptions.some((p) => !p.drug || !p.dosage)) {
      alert('Please fill in all required fields (Drug and Dosage).');
      return;
    }

    setPatients((prevPatients) =>
      prevPatients.map((p) =>
        p.id === selectedPatient.id ? { ...p, prescriptions } : p
      )
    );

    setAlertMessage(`Prescription given to ${selectedPatient.name}.`);
    setOpenPrescriptionDialog(false);
    setSelectedPatient(null);
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Fade in timeout={500}>
        <Typography
          variant="h4"
          gutterBottom
          style={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}
        >
          Doctor Panel
        </Typography>
      </Fade>

      {alertMessage && (
        <Slide direction="down" in={!!alertMessage} mountOnEnter unmountOnExit>
          <Alert
            severity="success"
            onClose={() => setAlertMessage('')}
            style={{ marginBottom: '20px' }}
          >
            {alertMessage}
          </Alert>
        </Slide>
      )}

      <Grid container spacing={4}>
        {patients.map((patient, index) => (
          <Grow in timeout={500 + index * 200} key={patient.id}>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                elevation={4}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = 'scale(1.05)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = 'scale(1)')
                }
              >
                <CardContent style={{ position: 'relative', paddingBottom: '16px' }}>
                  <Avatar
                    style={{
                      backgroundColor: '#1976d2',
                      color: '#fff',
                      position: 'absolute',
                      top: '-20px',
                      right: '16px',
                      width: '50px',
                      height: '50px',
                    }}
                  >
                    {patient.name[0]}
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    {patient.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Age: {patient.age}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Condition: {patient.condition}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: <strong>{patient.status}</strong>
                  </Typography>
                  <Tooltip title="Last Visit">
                    <Typography variant="body2" color="textSecondary">
                      <History fontSize="small" style={{ marginRight: '4px' }} />
                      Last Visit: {patient.lastVisit}
                    </Typography>
                  </Tooltip>
                  <Tooltip title="Appointment Time">
                    <Typography variant="body2" color="textSecondary">
                      <Event fontSize="small" style={{ marginRight: '4px' }} />
                      Appointment: {patient.appointmentTime}
                    </Typography>
                  </Tooltip>
                </CardContent>
                <CardActions style={{ justifyContent: 'space-between' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handlePrescribe(patient)}
                    startIcon={<LocalHospital />}
                  >
                    Prescribe
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleClearOPD(patient.id)}
                  >
                    Clear OPD
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAdmitPatient(patient.id)}
                  >
                    Admit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grow>
        ))}
      </Grid>

      {/* Prescription Dialog */}
      <Dialog
        open={openPrescriptionDialog}
        onClose={() => setOpenPrescriptionDialog(false)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Slide}
        transitionDuration={500}
      >
        <DialogTitle>
          Give Prescription to {selectedPatient?.name}
        </DialogTitle>
        <DialogContent>
          {prescriptions.map((prescription, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '16px',
                alignItems: 'center',
              }}
            >
              <TextField
                label="Drug"
                variant="outlined"
                required
                value={prescription.drug}
                onChange={(e) =>
                  handlePrescriptionChange(index, 'drug', e.target.value)
                }
                style={{ flex: 1 }}
              />
              <TextField
                label="Dosage"
                variant="outlined"
                required
                value={prescription.dosage}
                onChange={(e) =>
                  handlePrescriptionChange(index, 'dosage', e.target.value)
                }
                style={{ flex: 1 }}
              />
              <TextField
                label="Notes (Optional)"
                variant="outlined"
                value={prescription.notes}
                onChange={(e) =>
                  handlePrescriptionChange(index, 'notes', e.target.value)
                }
                style={{ flex: 2 }}
              />
              <IconButton
                color="error"
                onClick={() => handleRemovePrescription(index)}
              >
                <Delete />
              </IconButton>
            </div>
          ))}
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAddPrescription}
          >
            Add Prescription
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPrescriptionDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handlePrescriptionSubmit}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DoctorPanel;
