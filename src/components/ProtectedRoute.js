import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const role = localStorage.getItem('role'); // Get user role from localStorage

  if (!role) {
    return <Navigate to="/" />; // Redirect to landing page if not logged in
  }

  // Admin-only routes
  if (children.type.name === 'AdminDashboard' && role !== 'admin') {
    return <Navigate to="/admin-login" />;
  }

  // Patient-only routes
  if (children.type.name === 'PatientDashboard' && role !== 'patient') {
    return <Navigate to="/patient-login" />;
  }

  return children;
}

export default ProtectedRoute;
