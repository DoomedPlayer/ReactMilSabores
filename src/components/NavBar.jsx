import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="nav-container">
          {}
          <a className="brand" href="/">Pastelería 1000 Sabores</a> 
          
          {}
          <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`} id="nav-links">
            <li><a href="/" className="active">Inicio</a></li>
            <li><a href="/catalogo">Catálogo</a></li>
            <li><a href="/login">Mi Perfil</a></li>
            <li><a href="/carrito">Carrito de Compras</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;