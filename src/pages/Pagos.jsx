import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validatePayment } from '../validators/formValidaciones'
import '../pagos.css'; 

const Pagos = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      nombre: '', direccion: '', tarjeta: '', exp: '', cvv: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
      setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validatePayment(formData);
    setErrors(validationErrors)
    console.log('Procesando pago con:', formData);
    alert("✅ Pago realizado con éxito. ¡Gracias por tu compra! 🎂");
    navigate('/procesamiento'); 
  };

  return (
    <div className="main-content">
      <div className="pedido-box">
        <h5 className="section-title">Métodos de pago</h5>
        <form id="formPago" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input type="text" id="nombre" value={formData.nombre} onChange={handleChange} required />
            {errors.nombre && <small className="form-text error">{errors.nombre}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="direccion">Direccion</label>
            <input type="text" id="direccion" value={formData.direccion} onChange={handleChange} required />
            {errors.direccion && <small className="form-text error">{errors.direccion}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="tarjeta">Número de Tarjeta</label>
            <input type="text" id="tarjeta" maxLength="16"  value={formData.tarjeta} onChange={handleChange} required />
            {errors.tarjeta && <small className="form-text error">{errors.tarjeta}</small>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="exp">Expiración</label>
              <input type="text" id="exp" placeholder="MM/AA"  value={formData.exp} onChange={handleChange} required />
              {errors.exp && <small className="form-text error">{errors.exp}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input type="password" id="cvv" maxLength="3" value={formData.cvv} onChange={handleChange} required />
              {errors.cvv && <small className="form-text error">{errors.cvv}</small>}
            </div>
          </div>
          <hr className="divider" />
          <div className="button-group">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/carrito')}>Volver al Carrito</button>
            <button type="submit" className="btn btn-primary">Pagar Ahora</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pagos;