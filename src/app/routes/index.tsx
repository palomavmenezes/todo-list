// src/app/routes/index.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes as ReactRoutes } from 'react-router-dom';
import Lista from '../components/Lista';
import Form from '../pages/form/Form';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Routes: React.FC = () => {
  return (
    <Router>
      <Header />
      <ReactRoutes>
        <Route path="/" element={<Lista />} />
        <Route path="/form" element={<Form />} />
      </ReactRoutes>
      <Footer />
    </Router>
  );
};

export default Routes;
