import React from 'react';

const Promotions = () => {
  return (
    <section className="promotions">
      <h2>Promociones Especiales</h2>
      <div className="promotions-grid">
        {}
        <div className="promo-card">
          <h3>Descuento de por Vida</h3>
          <p>Regístrate con el código <strong>FELICES50</strong> y recibe un 10% de descuento de por vida.</p>
        </div>
        {}
        <div className="promo-card">
          <h3>Descuento Especial</h3>
          <p>Usuarios mayores de 50 años reciben un 50% de descuento en todos los productos.</p>
        </div>
      </div>
    </section>
  );
};

export default Promotions;