import axios from 'axios';

const backendURL = 'https://pepitooo.azurewebsites.net/';



console.log(`API URL: ${backendURL}api/act/actividades/`);

// Crea una instancia de Axios con la URL base configurada
const actividadesApi = axios.create({
  baseURL: `${backendURL}api/act/actividade/`,
});


export const getAllActividades = () => actividadesApi.get('/');

export const getActividad = (id) => actividadesApi.get(`/${id}`);

export const createActividad = (actividad) => actividadesApi.post('/', actividad);

export const updateActividad = (id, actividad) => actividadesApi.put(`/${id}/`, actividad);

export const deleteActividad = (id) => actividadesApi.delete(`/${id}`);
