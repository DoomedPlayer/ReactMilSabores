import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaShoppingBag, FaTruck } from 'react-icons/fa';
import '../proceso.css'; 

const Procesamiento = ({ cartItems =[], total = 0, setCart}) => {
  const navigate = useNavigate();
  const hoy = new Date();

  const fechaEntrega = new Date();
  fechaEntrega.setDate(hoy.getDate() + 2);

  const fechaConfirmado = hoy.toLocaleString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).replace(',', ''); 

  const fechaEstimada = fechaEntrega.toLocaleString('es-CL', {
    day: 'numeric',
    month: 'long'
  });

  const handleVolverAlInicio = () => {
    if (setCart) {
      console.log("Reiniciando carrito.");
      setCart([]);
    }
    navigate('/');
  };

  const isStep2Active = true; 
  const isStep3Active = false; 
  
  let progressClass = '';
  if (isStep3Active) {
    progressClass = 'progress-100';
  } else if (isStep2Active) {
    progressClass = 'progress-50';
  }

  return (
    <main className="tracking-container">
      <div className="titulo">
        <h1>Seguimiento de compra</h1>
      </div>
      <ul className={`progress-bar ${progressClass}`}>
        <li className="progress-step completed">
          <div className="step-circle"><FaCheckCircle /></div>
          <div className="step-details">
            <span className="step-text">Pedido confirmado</span>
            <span className="step-date">{fechaConfirmado}</span>
          </div>
        </li>
        <li className="progress-step active">
          <div className="step-circle"><FaShoppingBag /></div>
          <div className="step-details">
            <span className="step-text">¡Tu pedido está listo!</span>
            <span className="step-date">Pendiente</span>
          </div>
        </li>
        <li className="progress-step">
          <div className="step-circle"><FaTruck /></div>
          <div className="step-details">
            <span className="step-text">Pedido entregado</span>
            <span className="step-date">Pendiente</span>
          </div>
        </li>
      </ul>
      <div className="fecha-estimada">
        <span>Recibe el {fechaEstimada}</span>
      </div>
      <div className="resumen-pedido-box">
        <h5 className="section-title">Resumen de tu Compra</h5>
        
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item.code} className="resumen-item">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toLocaleString('es-CL')}</span>
            </div>
          ))
        ) : (
          <p>No se encontraron productos en el pedido.</p>
        )}
        
        <hr className="divider" />
        
        <div className="resumen-total">
          <strong>Total Pagado:</strong>
          <strong>${total.toLocaleString('es-CL')}</strong>
        </div>
      </div>
       <button 
          type="button" 
          className="btn btn-secondary" 
          style={{marginTop: '2rem'}}
          onClick={handleVolverAlInicio}>
          Volver al Inicio
        </button>
    </main>
  );
};

export default Procesamiento;