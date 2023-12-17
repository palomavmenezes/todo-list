// src/app/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Lista</Link>
        </li>
        <li>
          <Link to="/form">Cadastrar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
