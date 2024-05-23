// RecordatoriosComponent.jsx
import React, { useEffect, useState } from 'react';
import { createRecordatorio, deleteRecordatorio, getAllRecordatorios, updateRecordatorio } from '../api/recordatorio.api';

const RecordatoriosComponent = () => {
  const [recordatorios, setRecordatorios] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [recordatorioId, setRecordatorioId] = useState(null);

  useEffect(() => {
    loadRecordatorios();
  }, []);

  const loadRecordatorios = () => {
    getAllRecordatorios()
      .then(response => setRecordatorios(response.data))
      .catch(error => console.error(error));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const nuevoRecordatorio = { titulo, descripcion, fecha, hora };
    createRecordatorio(nuevoRecordatorio)
      .then(() => {
        loadRecordatorios();
        resetForm();
      })
      .catch(error => console.error(error));
  };

  const handleEdit = (recordatorio) => {
    setRecordatorioId(recordatorio.id);
    setTitulo(recordatorio.titulo);
    setDescripcion(recordatorio.descripcion);
    setFecha(recordatorio.fecha);
    setHora(recordatorio.hora);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const recordatorioActualizado = { titulo, descripcion, fecha, hora };
    updateRecordatorio(recordatorioId, recordatorioActualizado)
      .then(() => {
        loadRecordatorios();
        resetForm();
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (recordatorioId) => {
    deleteRecordatorio(recordatorioId)
      .then(() => {
        loadRecordatorios();
      })
      .catch(error => console.error(error));
  };

  const resetForm = () => {
    setTitulo('');
    setDescripcion('');
    setFecha('');
    setHora('');
    setRecordatorioId(null);
  };

  return (
    <div id='recordatorios' className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gestión de Recordatorios</h1>

      <form onSubmit={recordatorioId ? handleUpdate : handleCreate} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Título:</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
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
        </div>
        <button type="submit" className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300">Guardar</button>
      </form>

      <ul>
        {recordatorios.map(recordatorio => (
          <li key={recordatorio.id} className="border-b border-gray-200 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{recordatorio.titulo}</h2>
              <p className="text-gray-500">{recordatorio.fecha} - {recordatorio.hora}</p>
              <p>{recordatorio.descripcion}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(recordatorio)} className="text-blue-500">Editar</button>
              <button onClick={() => handleDelete(recordatorio.id)} className="text-red-500 ml-4">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordatoriosComponent;
