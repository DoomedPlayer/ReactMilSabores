import React, { useState } from 'react';
import Catalogo from '../pages/Catalogo';

  const Navbar = ({ onNavigate, totalItems = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Función para manejar el clic y llamar a onNavigate
  const handleNavClick = (e, page) => {
    e.preventDefault();
    onNavigate(page);
    // Cierra el menú en móvil después de hacer clic (opcional)
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header>
      <nav className="navbar">
        <div className="nav-container">
          {/* Usa handleNavClick para el brand link */}
          <a className="brand" href="/" onClick={(e) => handleNavClick(e, 'home')}>Pastelería 1000 Sabores</a> 
          
          <button className="nav-toggle" onClick={toggleMenu}>
              ☰
          </button>
          <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`} id="nav-links">
            {/* Usa handleNavClick para todos los enlaces */}
            <li><a href="/" className="active" onClick={(e) => handleNavClick(e, 'home')}>Inicio</a></li>
            <li><a href="/Catalogo" onClick={(e) => handleNavClick(e, 'catalogo')}>Catálogo</a></li>
            <li><a href="/login" onClick={(e) => handleNavClick(e, 'login')}>Mi Perfil</a></li>
            <li className="cart-icon-nav">
              <a href="/carrito" onClick={(e) => handleNavClick(e, 'carrito')}>
                Carrito de Compras (<span id="cart-count">{totalItems}</span>)
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;