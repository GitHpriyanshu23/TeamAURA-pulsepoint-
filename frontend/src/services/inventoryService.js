import axios from 'axios';

const API_BASE_URL = "http://localhost:8000/api";

export const getInventory = async () => {
    const response = await axios.get(`${API_BASE_URL}/inventory/`);
    return response.data;
};

export const addMedicine = async (medicineData) => {
    const response = await axios.post(`${API_BASE_URL}/inventory/add/`, medicineData);
    return response.data;
};
