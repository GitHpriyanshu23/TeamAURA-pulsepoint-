import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role: requiredRole }) {
  const role = localStorage.getItem('role'); // Get user role from localStorage

  // If user is not logged in, redirect to landing page
  if (!role) {
    return <Navigate to="/" />;
  }

  // If the user's role does not match the required role, redirect to the appropriate login page
  if (role !== requiredRole) {
    return <Navigate to={requiredRole === 'admin' ? '/admin-login' : '/patient-login'} />;
  }

  return children; // Render the child component if all checks pass
}

export default ProtectedRoute;
