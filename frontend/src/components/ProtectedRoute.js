import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role: requiredRole }) {
  const role = localStorage.getItem('role'); 
  
  if (!role) {
    return <Navigate to="/" />;
  }

  
  if (role !== requiredRole) {
    return <Navigate to={requiredRole === 'admin' ? '/admin-login' : '/patient-login'} />;
  }

  return children; 
}

export default ProtectedRoute;
