import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';

const PatientList = ({ patients, onPrescribe, onClearOPD, onAdmit }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Patient Name</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell>{patient.name}</TableCell>
            <TableCell>{patient.age}</TableCell>
            <TableCell>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => onPrescribe(patient)}
                style={{ marginRight: '8px' }}
              >
                Prescribe
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => onClearOPD(patient.id)}
                style={{ marginRight: '8px' }}
              >
                Clear OPD
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => onAdmit(patient.id)}
              >
                Admit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PatientList;
