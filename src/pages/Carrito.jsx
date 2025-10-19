import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../carrito.css'; 

const Carrito = ({ cartItems, total }) => {
  const navigate = useNavigate();
  
  return (
    <main className="carrito-container">
      <h1>🛒 Tu Carrito</h1>

      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="purchase-details-box">
          <h3>Detalle de la compra</h3>
          {cartItems.map(item => (
            <div className="detail-item" key={item.code}> 
              <span className="label">{item.name} (x{item.quantity})</span>
              <span className="value">${(item.price * item.quantity).toLocaleString('es-CL')}</span>
            </div>
          ))}
          <div className="detail-item total">
            <span className="label">Total:</span>
            <span className="value">${total.toLocaleString('es-CL')}</span>
          </div>
        </div>
      )}

      <div className="button-group">
        <button className="btn btn-secondary" onClick={() => navigate('/catalogo')}>
          Seguir Comprando
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/pagos')} disabled={cartItems.length === 0}>
          Finalizar Compra
        </button>
      </div>
    </main>
  );
};

export default Carrito;
