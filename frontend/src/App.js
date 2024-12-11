import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DoctorPanel from './components/DoctorPanel';
import NursePanel from './components/NursePanel';
import AdminNavbar from './components/AdminNavbar';
import PatientNavbar from './components/PatientNavbar';
import DoctorNavbar from './components/DoctorNavbar';
import NurseNavbar from './components/NurseNavbar'; // Separate navbar for nurses
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
  const navigate = useNavigate(); // React Router's navigation function

  // Sync state with localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Navbar selection based on role
  const renderNavbar = () => {
    switch (role) {
      case 'admin':
        return <AdminNavbar />;
      case 'patient':
        return <PatientNavbar />;
      case 'doctor':
        return <DoctorNavbar />;
      case 'nurse':
        return <NurseNavbar />;
      default:
        return null; // No navbar for undefined roles
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Dynamic Navbar */}
      {renderNavbar()}

      {/* Routes */}
      <div style={{ flex: 1 }}>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Login Pages */}
          <Route
            path="/patient-login"
            element={
              <PatientLogin
                onLoginSuccess={() => {
                  localStorage.setItem('role', 'patient');
                  setRole('patient');
                  navigate('/patient-dashboard'); // Smooth navigation
                }}
              />
            }
          />
          <Route
            path="/admin-login"
            element={
              <AdminLogin
                onLoginSuccess={() => {
                  localStorage.setItem('role', 'admin');
                  setRole('admin');
                  navigate('/admin-dashboard'); // Smooth navigation
                }}
              />
            }
          />
          <Route
            path="/doctor-login"
            element={
              <AdminLogin
                onLoginSuccess={() => {
                  localStorage.setItem('role', 'doctor');
                  setRole('doctor');
                  navigate('/doctor-panel'); // Smooth navigation
                }}
              />
            }
          />
          <Route
            path="/nurse-login"
            element={
              <AdminLogin
                onLoginSuccess={() => {
                  localStorage.setItem('role', 'nurse');
                  setRole('nurse');
                  navigate('/nurse-panel'); // Smooth navigation
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

          {/* Doctor Pages */}
          <Route
            path="/doctor-panel"
            element={
              <ProtectedRoute role="doctor">
                <DoctorPanel />
              </ProtectedRoute>
            }
          />

          {/* Nurse Pages */}
          <Route
            path="/nurse-panel"
            element={
              <ProtectedRoute role="nurse">
                <NursePanel />
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
