// src/components/HeroSection.jsx
import React from 'react';

// Recibe onNavigate
const HeroSection = ({ onNavigate }) => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>¡50 Años de Dulzura y Tradición!</h1>
        <p>Renovamos nuestra experiencia de compra para celebrar nuestro aniversario y nuestra historia, desde el Récord Guinness de 1995.</p>
        {/* Llama a onNavigate con 'catalogo' al hacer clic */}
        <a href="#catalogo" onClick={() => onNavigate('catalogo')} className="btn">Explora el Catálogo</a>
      </div>
    </section>
  );
};

export default HeroSection;