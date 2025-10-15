// src/App.js

import React, { useState, useCallback } from 'react'; // AÑADIDO: useCallback
import Home from './pages/Home';
import Catalogo from './pages/Catalogo'; // RENOMBRADO para evitar conflicto

// Componentes Placeholder para las otras "páginas"
const Login = () => <main><h2>Mi Perfil / Login</h2></main>;
const Carrito = () => <main><h2>Carrito de Compras</h2></main>;
const Blog = () => <main><h2>Nuestro Blog Dulce</h2></main>; 

const App = () => {
  // 1. Definir el estado para la vista actual (por defecto: 'home')
  const [currentPage, setCurrentPage] = useState('home');

  // Función de navegación que se pasa como prop a los componentes
  const navigate = useCallback((page) => {
    setCurrentPage(page);
  }, []);
  
  // 3. Función para renderizar el componente correcto basado en el estado
  const renderView = () => {
    switch (currentPage) { // CORREGIDO: Usar 'currentPage'
      case 'home':
        // A Home le pasamos navigate
        return <Home onNavigate={navigate} />; 
      case 'catalogo':
        // Usa el componente CatalogoPage real
        return <Catalogo onNavigate={navigate} />;
      case 'login':
        return <Login />;
      case 'carrito':
        return <Carrito />;
      case 'blog':
        return <Blog/>;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
        <>
          {renderView()} 
        </>
  );
};

export default App;