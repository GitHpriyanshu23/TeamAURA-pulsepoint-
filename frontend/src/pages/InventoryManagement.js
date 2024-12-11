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
} from '@mui/material';

function InventoryManagement() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Simulated data fetch (replace with API call)
    const fetchInventory = async () => {
      const data = [
        { id: 1, name: 'Paracetamol', quantity: 50 },
        { id: 2, name: 'Ibuprofen', quantity: 30 },
        { id: 3, name: 'Amoxicillin', quantity: 20 },
      ];
      setInventory(data);
    };
    fetchInventory();
  }, []);

  const handleRestock = (id) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 10 } : item
      )
    );
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Medicine ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRestock(item.id)}
                  >
                    Restock
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default InventoryManagement;
