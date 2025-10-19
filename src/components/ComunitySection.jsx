// src/components/CommunitySection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Recibe onNavigate
const CommunitySection = () => {
  return (
    <section className="community-section">
      <h2>Nuestra Comunidad Dulce</h2>
      <p>Descubre recetas, consejos de repostería de los estudiantes de Duoc, y cómo tus compras apoyan a la comunidad local.</p>
      <Link to="/blog" className="btn">Visita Nuestro Blog</Link>
    </section>
  );
};

export default CommunitySection;