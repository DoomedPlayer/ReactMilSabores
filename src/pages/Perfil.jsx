import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateProfile } from '../validators/formValidaciones';
import '../perfil.css';

const Perfil = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      nombre: 'Nombre Apellido',
      email: 'correo@ejemplo.com',
      fechaNacimiento: '',
      telefono: '',
      direccion: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
      setFormData({...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateProfile(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
        console.log('Perfil actualizado:', formData);
        alert('¡Perfil actualizado con éxito!');
        navigate('/');
    }
  };

  return (
    <div className="main-content">
      <div className="profile-main">
        <h5 className="section-title">Información Personal</h5>
        <form id="perfilForm" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input type="text" id="nombre" value={formData.nombre} onChange={handleChange} required />
              {errors.nombre && <small className="form-text error">{errors.nombre}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" id="email" value={formData.email} readOnly />
              <small className="form-text">El correo no se puede modificar.</small>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
              <input type="date" id="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
              {errors.fechaNacimiento && <small className="form-text error">{errors.fechaNacimiento}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input type="tel" id="telefono" placeholder="Ej: 912345678" value={formData.telefono} onChange={handleChange} />
              {errors.telefono && <small className="form-text error">{errors.telefono}</small>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="direccion">Dirección</label>
            <input type="text" id="direccion" placeholder="Ingresa tu dirección" value={formData.direccion} onChange={handleChange} />
          </div>
          <hr className="divider" />
          <div className="button-group">
            <button type="submit" className="btn btn-primary">Actualizar Perfil</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Volver al Inicio</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Perfil;