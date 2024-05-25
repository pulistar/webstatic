


import axios from 'axios';



const backendURL = 'https://pepitooo.azurewebsites.net/';

console.log(`API URL: ${backendURL}/api/ali/alimentacion/`);

// Crea una instancia de Axios con la URL base configurada
const actividadesApi = axios.create({
  baseURL: `${backendURL}/api/ali/alimentacion/`,
});




export const getAllAlimentaciones = () => alimentacionesApi.get('/');

export const getAlimentacion = (id) => alimentacionesApi.get(`/${id}`);

export const createAlimentacion = (alimentacion) => alimentacionesApi.post('/', alimentacion);

export const updateAlimentacion = (id, alimentacion) => alimentacionesApi.put(`/${id}/`, alimentacion);

export const deleteAlimentacion = (id) => alimentacionesApi.delete(`/${id}`);


