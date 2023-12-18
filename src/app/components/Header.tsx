// src/app/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="inset-x-0 top-0 z-50 bg-purple-800">
      <nav className="flex items-center w-full justify-center absolute menu">
        <ul className="flex items-center justify-between gap-10 z-10 text-white">
          <li>
            <Link to="/">Lista de Tarefas</Link>
          </li>
          <li>
            <Link to="/form">Cadastrar ou Editar</Link>
          </li>
        </ul>
      </nav>

      <h1 className='absolute text-7xl text-white title-banner font-bold'>Tarefas</h1>

      <div className='flex items-end todo-bg'>
      </div>
    </header>
  );
};

export default Header;
