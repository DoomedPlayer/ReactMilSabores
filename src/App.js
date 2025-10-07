// src/App.jsx (Controlador de vistas sin React Router DOM)
import React, { useState } from 'react';
import './stylesheet.css';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';

// Componentes Placeholder para las otras "páginas"
const Catalogo = ({ onNavigate }) => <main><h2>Catálogo de Productos</h2><p><a href="#" onClick={() => onNavigate('home')}>Volver a Inicio</a></p></main>;
const Login = () => <main><h2>Mi Perfil / Login</h2></main>;
const Carrito = () => <main><h2>Carrito de Compras</h2></main>;
const Blog = () => <main><h2>Nuestro Blog Dulce</h2></main>; 

const App = () => {
  // 1. Definir el estado para la vista actual (por defecto: 'home')
  const [currentView, setCurrentView] = useState('home');

  // 2. Función para cambiar la vista (se pasa a Navbar y otros componentes)
  const navigateTo = (viewName) => {
    setCurrentView(viewName);
  };
  
  // 3. Función para renderizar el componente correcto basado en el estado
  const renderView = () => {
    switch (currentView) {
      case 'home':
        // A Home le pasamos navigateTo para que sus subcomponentes (Hero, Community)
        // puedan cambiar la vista a Catálogo o Blog.
        return <Home onNavigate={navigateTo} />; 
      case 'catalogo':
        // A Catalogo le pasamos navigateTo en caso de que necesite enlaces de vuelta
        return <Catalogo onNavigate={navigateTo} />;
      case 'login':
        return <Login />;
      case 'carrito':
        return <Carrito />;
      case 'blog':
        return <Blog />;
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <>
      {/* Navbar recibe la función navigateTo para manejar los clics */}
      <Navbar onNavigate={navigateTo} /> 
      
      {/* El cuerpo de la aplicación muestra el componente seleccionado */}
      {renderView()} 
      
      <Footer />
    </>
  );
};

export default App;