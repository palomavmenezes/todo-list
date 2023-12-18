// src/app/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className='mx-auto h-10 flex flex-shrink-0 items-center justify-center bg-purple-700'>
        <p className='text-white'>
          Copyright 2023 -  Desenvolvido por <Link to="https://www.linkedin.com/in/palomamenezes/" target='_blank'>Paloma Menezes</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
