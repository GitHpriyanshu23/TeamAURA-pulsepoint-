import React from 'react';
import { Container, Typography } from '@mui/material';

function OPDQueue() {
  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        OPD Queue Management
      </Typography>
      <Typography color="textSecondary">
        Here, you can manage the OPD queue for patients.
      </Typography>
    </Container>
  );
}

export default OPDQueue;
