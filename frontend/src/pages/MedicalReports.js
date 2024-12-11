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
  Paper,
  TableContainer,
} from '@mui/material';

function MedicalReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Simulated API call to fetch reports
    const fetchReports = async () => {
      const data = [
        { id: 1, title: 'Blood Test Report', date: '2024-12-01', fileUrl: '/files/blood-test.pdf' },
        { id: 2, title: 'X-Ray Report', date: '2024-11-20', fileUrl: '/files/x-ray.pdf' },
        { id: 3, title: 'MRI Scan Report', date: '2024-11-15', fileUrl: '/files/mri-scan.pdf' },
      ];
      setReports(data);
    };

    fetchReports();
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: '40px' }}>
      <Typography variant="h4" gutterBottom>
        Medical Reports
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Report Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.title}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginRight: '10px' }}
                    onClick={() => window.open(report.fileUrl, '_blank')}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = report.fileUrl;
                      link.download = report.title;
                      link.click();
                    }}
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MedicalReports;
