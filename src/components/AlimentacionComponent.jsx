// AlimentacionComponent.jsx
import React, { useEffect, useState } from 'react';
import { createAlimentacion, deleteAlimentacion, getAllAlimentaciones, updateAlimentacion } from '../api/alimentacion.api';

const AlimentacionComponent = () => {
  const [alimentaciones, setAlimentaciones] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [tipoComida, setTipoComida] = useState('desayuno');
  const [calorias, setCalorias] = useState('');
  const [alimentacionId, setAlimentacionId] = useState(null);

  useEffect(() => {
    loadAlimentaciones();
  }, []);

  const loadAlimentaciones = () => {
    getAllAlimentaciones()
      .then(response => setAlimentaciones(response.data))
      .catch(error => console.error(error));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const nuevaAlimentacion = { nombre, descripcion, fecha, hora, tipo_comida: tipoComida, calorias };
    createAlimentacion(nuevaAlimentacion)
      .then(() => {
        loadAlimentaciones();
        resetForm();
      })
      .catch(error => console.error(error));
  };

  const handleEdit = (alimentacion) => {
    setAlimentacionId(alimentacion.id);
    setNombre(alimentacion.nombre);
    setDescripcion(alimentacion.descripcion);
    setFecha(alimentacion.fecha);
    setHora(alimentacion.hora);
    setTipoComida(alimentacion.tipo_comida);
    setCalorias(alimentacion.calorias);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const alimentacionActualizada = { nombre, descripcion, fecha, hora, tipo_comida: tipoComida, calorias };
    updateAlimentacion(alimentacionId, alimentacionActualizada)
      .then(() => {
        loadAlimentaciones();
        resetForm();
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (alimentacionId) => {
    deleteAlimentacion(alimentacionId)
      .then(() => {
        loadAlimentaciones();
      })
      .catch(error => console.error(error));
  };

  const resetForm = () => {
    setNombre('');
    setDescripcion('');
    setFecha('');
    setHora('');
    setTipoComida('desayuno');
    setCalorias('');
    setAlimentacionId(null);
  };

  return (
    <div id='alimentacion' className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gestión de Alimentación</h1>

      <form onSubmit={alimentacionId ? handleUpdate : handleCreate} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Fecha:</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Hora:</label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Calorías:</label>
            <input
              type="number"
              value={calorias}
              onChange={(e) => setCalorias(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-1">Descripción:</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              rows="3"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Tipo de Comida:</label>
            <select
              value={tipoComida}
              onChange={(e) => setTipoComida(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="desayuno">Desayuno</option>
              <option value="almuerzo">Almuerzo</option>
              <option value="cena">Cena</option>
            </select>
          </div>
        </div>
        <button type="submit" className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300">Guardar</button>
      </form>

      <ul>
        {alimentaciones.map(alimentacion => (
          <li key={alimentacion.id} className="border-b border-gray-200 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{alimentacion.nombre}</h2>
              <p className="text-gray-500">{alimentacion.fecha} - {alimentacion.hora}</p>
              <p>{alimentacion.descripcion}</p>
              <p>{alimentacion.tipo_comida.charAt(0).toUpperCase() + alimentacion.tipo_comida.slice(1)} - {alimentacion.calorias} Calorías</p>
            </div>
            <div>
              <button onClick={() => handleEdit(alimentacion)} className="text-blue-500">Editar</button>
              <button onClick={() => handleDelete(alimentacion.id)} className="text-red-500 ml-4">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlimentacionComponent;
