import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar'; // Admin-specific Navbar
import PatientNavbar from './components/PatientNavbar'; // Patient-specific Navbar
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import PatientLogin from './pages/PatientLogin';
import AdminLogin from './pages/AdminLogin';
import PatientDashboard from './pages/PatientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OpdQueue from './pages/OpdQueue';
import BedManagement from './pages/BedManagement';
import InventoryManagement from './pages/InventoryManagement';
import BookOPD from './pages/BookOPD';
import BookingHistory from './pages/BookingHistory';
import ReserveBed from './pages/ReserveBed';
import ReservationHistory from './pages/ReservationHistory';
import PatientSignUp from './pages/PatientSignUp';
import MedicalReports from './pages/MedicalReports';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role')); // Initialize role from localStorage

  // Update role when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role'));
    };

    window.addEventListener('storage', handleStorageChange); // Listen to localStorage changes
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar */}
      {role === 'admin' && <AdminNavbar />}
      {role === 'patient' && <PatientNavbar />}

      {/* Routes */}
      <div style={{ flex: 1 }}>
        <Routes>
          {/* Landing Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/patient-login"
            element={
              <PatientLogin
                onLoginSuccess={() => {
                  localStorage.setItem('authToken', 'exampleToken'); // Replace with real token
                  localStorage.setItem('role', 'patient');
                  setRole('patient'); // Update role in state
                  window.location.href = '/patient-dashboard'; // Redirect
                }}
              />
            }
          />
          <Route
            path="/admin-login"
            element={
              <AdminLogin
                onLoginSuccess={() => {
                  localStorage.setItem('authToken', 'exampleToken'); // Replace with real token
                  localStorage.setItem('role', 'admin');
                  setRole('admin'); // Update role in state
                  window.location.href = '/admin-dashboard'; // Redirect
                }}
              />
            }
          />

          {/* Patient Pages */}
          <Route
            path="/patient-dashboard"
            element={
              <ProtectedRoute role="patient">
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-opd"
            element={
              <ProtectedRoute role="patient">
                <BookOPD />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reserve-bed"
            element={
              <ProtectedRoute role="patient">
                <ReserveBed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medical-reports"
            element={
              <ProtectedRoute role="patient">
                <MedicalReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-history"
            element={
              <ProtectedRoute role="patient">
                <BookingHistory />
              </ProtectedRoute>
            }
          />
          <Route path="/patient-signup" element={<PatientSignUp />} />

          {/* Admin Pages */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/opd-queue"
            element={
              <ProtectedRoute role="admin">
                <OpdQueue />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bed-management"
            element={
              <ProtectedRoute role="admin">
                <BedManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory-management"
            element={
              <ProtectedRoute role="admin">
                <InventoryManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservation-history"
            element={
              <ProtectedRoute role="admin">
                <ReservationHistory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
