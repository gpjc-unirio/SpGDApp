import React from 'react';
import Rotas from './routes/index';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../src/context/auth';

export default function App() {
  return (
    <AuthProvider>
      
        <Rotas />
      
    </AuthProvider>

  )
}