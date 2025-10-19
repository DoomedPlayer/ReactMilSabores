import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaShoppingBag, FaTruck } from 'react-icons/fa';
import '../proceso.css'; 

const Procesamiento = ({ onNavigate }) => {
  const navigate = useNavigate();
  return (
    <main className="tracking-container">
      <div className="titulo">
        <h1>Seguimiento de compra</h1>
      </div>
      <ul className="progress-bar">
        <li className="progress-step completed">
          <div className="step-circle"><FaCheckCircle /></div>
          <div className="step-details">
            <span className="step-text">Pedido confirmado</span>
            <span className="step-date">17/10/ 10:25</span>
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
        <span>Recibe el 20 de octubre</span>
      </div>
       <button 
          type="button" 
          className="btn btn-secondary" 
          style={{marginTop: '2rem'}}
          onClick={() => navigate('/')}>
          Volver al Inicio
        </button>
    </main>
  );
};

export default Procesamiento;