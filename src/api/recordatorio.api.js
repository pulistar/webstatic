import axios from 'axios';

const URL =
  process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'http://localhost:8000';

console.log(`API URL: ${URL}/api/rec/recordatorio/`);

const recordatoriosApi = axios.create({
  baseURL: `${URL}/api/rec/recordatorio/`,
});

export const getAllRecordatorios = () => recordatoriosApi.get('/');

export const getRecordatorio = (id) => recordatoriosApi.get(`/${id}`);

export const createRecordatorio = (recordatorio) => recordatoriosApi.post('/', recordatorio);

export const updateRecordatorio = (id, recordatorio) => recordatoriosApi.put(`/${id}/`, recordatorio);

export const deleteRecordatorio = (id) => recordatoriosApi.delete(`/${id}`);
