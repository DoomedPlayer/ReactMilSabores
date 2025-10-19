import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

  const Navbar = ({totalItems = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMobileMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header>
      <nav className="navbar">
        <div className="nav-container">
          <Link className="brand" to="/" onClick={closeMobileMenu}>Pastelería 1000 Sabores</Link> 
          
          <button className="nav-toggle" onClick={toggleMenu}>
              ☰
          </button>
          <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`} id="nav-links">
            <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMobileMenu}>Inicio</NavLink></li>
            <li><NavLink to="/catalogo" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMobileMenu}>Catálogo</NavLink></li>
            <li><NavLink  to="/login" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMobileMenu}>Mi Perfil</NavLink></li>
            <li className="cart-icon-nav">
              <Link to="/carrito" onClick={closeMobileMenu}>
                Carrito de Compras (<span id="cart-count">{totalItems}</span>)
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;