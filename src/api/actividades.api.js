import axios from 'axios';

const URL =
  process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : 'https://pepitooo.azurewebsites.net/';

console.log(`API URL: ${URL}/api/act/actividades/`);

const actividadesApi = axios.create({
  baseURL: `${URL}/api/act/actividades/`,
});

export const getAllActividades = () => actividadesApi.get('/');

export const getActividad = (id) => actividadesApi.get(`/${id}`);

export const createActividad = (actividad) => actividadesApi.post('/', actividad);

export const updateActividad = (id, actividad) => actividadesApi.put(`/${id}/`, actividad);

export const deleteActividad = (id) => actividadesApi.delete(`/${id}`);
