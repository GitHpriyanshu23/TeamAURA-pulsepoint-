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
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { Event, History, Bed } from '@mui/icons-material';

const NursePanel = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [alertMessage, setAlertMessage] = useState(false);
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
        bedNumber: 'B-101',
        prescriptions: [
          { drug: 'Paracetamol', dosage: '500mg', notes: 'Take after meals' },
        ],
      },
      {
        id: 2,
        name: 'Jane Smith',
        age: 45,
        condition: 'Diabetes',
        status: 'Critical',
        lastVisit: '2023-11-20',
        appointmentTime: '11:30 AM',
        bedNumber: 'C-205',
        prescriptions: [
          { drug: 'Insulin', dosage: '10 units', notes: 'Inject before breakfast' },
        ],
      },
    ];
    setTimeout(() => {
      setPatients(mockPatients);
    }, 500);
  }, []);

  const handleViewPrescriptions = (patient) => {
    setSelectedPatient(patient);
    setOpenPrescriptionDialog(true);
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}
      >
        Nurse Panel
      </Typography>

      {alertMessage && (
        <Alert
          severity="success"
          onClose={() => setAlertMessage(false)}
          style={{ marginBottom: '20px' }}
        >
          {alertMessage}
        </Alert>
      )}

      <Grid container spacing={3}>
        {patients.map((patient, index) => (
          <Grid item xs={12} md={6} lg={4} key={patient.id}>
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
                <Tooltip title="Bed Number">
                  <Typography variant="body2" color="textSecondary">
                    <Bed fontSize="small" style={{ marginRight: '4px' }} />
                    Bed: {patient.bedNumber}
                  </Typography>
                </Tooltip>
              </CardContent>
              <CardActions style={{ justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewPrescriptions(patient)}
                >
                  View Prescriptions
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Prescription Dialog */}
      <Dialog
        open={openPrescriptionDialog}
        onClose={() => setOpenPrescriptionDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Prescriptions for {selectedPatient?.name}
        </DialogTitle>
        <DialogContent>
          {selectedPatient?.prescriptions.map((prescription, index) => (
            <div key={index} style={{ marginBottom: '16px' }}>
              <Typography variant="body1">
                <strong>Drug:</strong> {prescription.drug}
              </Typography>
              <Typography variant="body1">
                <strong>Dosage:</strong> {prescription.dosage}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Notes:</strong> {prescription.notes || 'None'}
              </Typography>
              <hr />
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default NursePanel;
