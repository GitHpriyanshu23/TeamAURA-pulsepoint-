import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PatientLogin from './pages/PatientLogin';
import AdminLogin from './pages/AdminLogin';
import PatientDashboard from './pages/PatientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OPDQueue from './pages/OPDQueue';
import BedManagement from './pages/BedManagement';
import InventoryManagement from './pages/InventoryManagement';
import BookOPD from './pages/BookOPD';
import BookingHistory from './pages/BookingHistory';
import ReserveBed from './pages/ReserveBed';
import ReservationHistory from './pages/ReservationHistory';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div>
      <Routes>
        {/* Landing Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Patient Pages */}
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute>
              <PatientDashboard />
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

        <Route
          path="/book-opd"
          element={
            <ProtectedRoute>
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
          path="/booking-history"
          element={   
            <ProtectedRoute role="patient">
              <BookingHistory />
            </ProtectedRoute>
          }
       />


        {/* Admin Pages */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/opd-queue"
          element={
            <ProtectedRoute>
              <OPDQueue />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bed-management"
          element={
            <ProtectedRoute>
              <BedManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory-management"
          element={
            <ProtectedRoute>
              <InventoryManagement />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
