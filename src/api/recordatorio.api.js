import axios from 'axios';

const backendURL = 'https://pepitooo.azurewebsites.net/';

console.log(`API URL: ${backendURL}api/rec/recordatorio/`);

// Crea una instancia de Axios con la URL base configurada
const recordatoriosApi = axios.create({
  baseURL: `${backendURL}api/rec/recordatorio/`,
});

export const getAllRecordatorios = () => recordatoriosApi.get('/');

export const getRecordatorio = (id) => recordatoriosApi.get(`/${id}`);

export const createRecordatorio = (recordatorio) => recordatoriosApi.post('/', recordatorio);

export const updateRecordatorio = (id, recordatorio) => recordatoriosApi.put(`/${id}/`, recordatorio);

export const deleteRecordatorio = (id) => recordatoriosApi.delete(`/${id}`);
