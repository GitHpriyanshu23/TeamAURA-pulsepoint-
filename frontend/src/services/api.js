import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-backend-url.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all departments
export const fetchDepartments = async () => {
  const response = await api.get('/departments');
  return response.data;
};

// Fetch all doctors
export const fetchDoctors = async () => {
  const response = await api.get('/doctors');
  return response.data;
};

// Book an OPD appointment
export const bookAppointment = async (appointmentData) => {
  const response = await api.post('/appointments', appointmentData);
  return response.data;
};

// Book a bed
export const bookBed = async (bedData) => {
  const response = await api.post('/beds', bedData);
  return response.data;
};
