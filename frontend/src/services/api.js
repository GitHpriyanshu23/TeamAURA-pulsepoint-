import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-backend-url.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDepartments = async () => {
  const response = await api.get('/departments');
  return response.data;
};


export const fetchDoctors = async () => {
  const response = await api.get('/doctors');
  return response.data;
};


export const bookAppointment = async (appointmentData) => {
  const response = await api.post('/appointments', appointmentData);
  return response.data;
};


export const bookBed = async (bedData) => {
  const response = await api.post('/beds', bedData);
  return response.data;
};
