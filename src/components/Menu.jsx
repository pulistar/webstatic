// Menu.jsx
import React from 'react';
import { Link } from 'react-router-dom';



const Menu = () => {
  return (
    <>
      <header className='flex items-center justify-between p-10'>
        <Link to="/" className='text-white font-roboto text-3xl tracking-wider flex items-center'> Salud y Bienestar</Link>
        <nav className='space-x-4'>
          <div className='ssm:hidden log:block space-x-2'>
            <Link to="/actividades" className='text-white hover:bg-indigo-800 rounded-full px-5 py-2 text-xl'>Gestión de Actividades</Link>
            <Link to="/alimentacion" className='text-white hover:bg-indigo-800 rounded-full px-5 py-2 text-xl'>Gestión de Alimentación</Link>
            <Link to="/recordatorios" className='text-white hover:bg-indigo-800 rounded-full px-5 py-2 text-xl'>Gestión de Recordatorios</Link>
          </div>
        </nav>
        
      </header>
    </>
  );
}

export default Menu;
