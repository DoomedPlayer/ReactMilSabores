import React from 'react';

const Header = ({ title }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      {/* Podrías añadir aquí un buscador, notificaciones, etc. */}
    </header>
  );
};

export default Header;