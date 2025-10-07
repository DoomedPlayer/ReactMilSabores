// src/components/CommunitySection.jsx
import React from 'react';

// Recibe onNavigate
const CommunitySection = ({ onNavigate }) => {
  return (
    <section className="community-section">
      <h2>Nuestra Comunidad Dulce</h2>
      <p>Descubre recetas, consejos de repostería de los estudiantes de Duoc, y cómo tus compras apoyan a la comunidad local.</p>
      {/* Llama a onNavigate con 'blog' al hacer clic */}
      <a href="#blog" onClick={() => onNavigate('blog')} className="btn">Visita Nuestro Blog</a>
    </section>
  );
};

export default CommunitySection;