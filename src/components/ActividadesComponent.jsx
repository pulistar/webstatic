// ActividadesComponent.jsx
import React, { useEffect, useState } from 'react';
import { createActividad, deleteActividad, getAllActividades, updateActividad } from '../api/actividades.api';

const ActividadesComponent = () => {
  const [actividades, setActividades] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [duracion, setDuracion] = useState('');
  const [tipo, setTipo] = useState('ejercicio');
  const [actividadId, setActividadId] = useState(null);

  useEffect(() => {
    loadActividades();
  }, []);

  const loadActividades = () => {
    getAllActividades()
      .then(response => setActividades(response.data))
      .catch(error => console.error(error));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const nuevaActividad = { titulo, descripcion, fecha, hora, duracion, tipo };
    createActividad(nuevaActividad)
      .then(() => {
        loadActividades();
        resetForm();
      })
      .catch(error => console.error(error));
  };

  const handleEdit = (actividad) => {
    setActividadId(actividad.id);
    setTitulo(actividad.titulo);
    setDescripcion(actividad.descripcion);
    setFecha(actividad.fecha);
    setHora(actividad.hora);
    setDuracion(actividad.duracion);
    setTipo(actividad.tipo);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const actividadActualizada = { titulo, descripcion, fecha, hora, duracion, tipo };
    updateActividad(actividadId, actividadActualizada)
      .then(() => {
        loadActividades();
        resetForm();
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (actividadId) => {
    deleteActividad(actividadId)
      .then(() => {
        loadActividades();
      })
      .catch(error => console.error(error));
  };

  const resetForm = () => {
    setTitulo('');
    setDescripcion('');
    setFecha('');
    setHora('');
    setDuracion('');
    setTipo('ejercicio');
    setActividadId(null);
  };

  return (
    <div id='actividades' className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gestión de Actividades</h1>

      <form onSubmit={actividadId ? handleUpdate : handleCreate} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Título:</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Fecha:</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Hora:</label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Duración:</label>
            <input
              type="text"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-1">Descripción:</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Tipo:</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            >
              <option value="ejercicio">Ejercicio</option>
              <option value="dieta">Dieta</option>
              <option value="hidratacion">Hidratación</option>
            </select>
          </div>
        </div>
        <button type="submit" className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300">Guardar</button>
      </form>

      <ul>
        {actividades.map(actividad => (
          <li key={actividad.id} className="border-b border-gray-200 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{actividad.titulo}</h2>
              <p className="text-gray-500">{actividad.fecha} - {actividad.hora}</p>
              <p>{actividad.descripcion}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(actividad)} className="text-blue-500">Editar</button>
              <button onClick={() => handleDelete(actividad.id)} className="text-red-500 ml-4">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActividadesComponent;
