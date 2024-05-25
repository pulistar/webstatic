


import axios from 'axios';

const URL =
  process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'https://salud.azurewebsites.net';

console.log(`API URL: ${URL}/api/ali/alimentacion/`);

const alimentacionesApi = axios.create({
  baseURL: `${URL}/api/ali/alimentacion/`,
});




export const getAllAlimentaciones = () => alimentacionesApi.get('/');

export const getAlimentacion = (id) => alimentacionesApi.get(`/${id}`);

export const createAlimentacion = (alimentacion) => alimentacionesApi.post('/', alimentacion);

export const updateAlimentacion = (id, alimentacion) => alimentacionesApi.put(`/${id}/`, alimentacion);

export const deleteAlimentacion = (id) => alimentacionesApi.delete(`/${id}`);


