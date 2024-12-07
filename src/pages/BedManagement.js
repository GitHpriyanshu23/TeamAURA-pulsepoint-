import React from 'react';
import { Container, Typography } from '@mui/material';

function BedManagement() {
  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Bed Management
      </Typography>
      <Typography color="textSecondary">
        Here, you can manage bed availability and assignments.
      </Typography>
    </Container>
  );
}

export default BedManagement;
