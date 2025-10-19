import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLogin, validateRegistration } from '../validators/formValidaciones';
import '../styleReg.css'; 
import '../login.css';

const Login = ({ onNavigate }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});
  const [regData, setRegData] = useState({
      nombre: '', email: '', fechaNacimiento: '', password: '', codigoDescuento: ''
  });
  const [regErrors, setRegErrors] = useState({});
  const navigate = useNavigate();

const handleLoginSubmit = (event) => {
    event.preventDefault();
    const errors = validateLogin(loginData.email, loginData.password);
    setLoginErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log('Login exitoso:', loginData);
      navigate('/');
    }
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const errors = validateRegistration(regData);
    setRegErrors(errors);
    if (Object.keys(errors).length === 0) {
        console.log('Registro exitoso:', regData);
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        setIsLoginView(true);
    }
  };

  const handleLoginChange = (e) => setLoginData({...loginData, [e.target.id]: e.target.value});
  const handleRegChange = (e) => setRegData({...regData, [e.target.id]: e.target.value});

  return (
    <div className="login-container" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <h1 className="titulo-principal">
        {isLoginView ? '¡Bienvenido de nuevo!' : '¡Únete a la Familia Dulce!'}
      </h1>
      <p className="texto-secundario">
        {isLoginView ? 'Inicia sesión para continuar.' : 'Regístrate para recibir promociones.'}
      </p>

      {isLoginView ? (
        <section className="form-container active">
          <h2 className="titulo-secundario">Iniciar Sesión</h2>
          <form onSubmit={handleLoginSubmit} className="formulario" noValidate>
            <div className="campo">
              <label htmlFor="email">Correo Electrónico:</label>
              <input type="email" id="email" value={loginData.email} onChange={handleLoginChange} />
              {loginErrors.email && <span className="error-message">{loginErrors.email}</span>}
            </div>
            <div className="campo">
              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" value={loginData.password} onChange={handleLoginChange} />
              {loginErrors.password && <span className="error-message">{loginErrors.password}</span>}
            </div>
            <button type="submit" className="boton-submit">Acceder</button>
          </form>
          <div className="switch-form">
            ¿No tienes una cuenta? <a onClick={() => setIsLoginView(false)} style={{cursor: 'pointer', color: 'blue'}}>Regístrate aquí</a>
          </div>
        </section>
      ) : (
        <section className="form-container active">
          <h2 className="titulo-secundario">Crear una Cuenta</h2>
          <form onSubmit={handleRegisterSubmit} className="formulario" noValidate>
             <div className="campo"><label htmlFor="nombre">Nombre Completo:</label><input type="text" id="nombre" value={regData.nombre} onChange={handleRegChange}/>{regErrors.nombre && <span className="error-message">{regErrors.nombre}</span>}</div>
             <div className="campo"><label htmlFor="email">Correo:</label><input type="email" id="email" value={regData.email} onChange={handleRegChange}/>{regErrors.email && <span className="error-message">{regErrors.email}</span>}</div>
             <div className="campo"><label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label><input type="date" id="fechaNacimiento" value={regData.fechaNacimiento} onChange={handleRegChange}/>{regErrors.fechaNacimiento && <span className="error-message">{regErrors.fechaNacimiento}</span>}</div>
             <div className="campo"><label htmlFor="password">Contraseña:</label><input type="password" id="password" value={regData.password} onChange={handleRegChange}/>{regErrors.password && <span className="error-message">{regErrors.password}</span>}</div>
             <div className="campo"><label htmlFor="codigoDescuento">Código de Descuento (Opcional):</label><input type="text" id="codigoDescuento" value={regData.codigoDescuento} onChange={handleRegChange}/>{regErrors.codigoDescuento && <span className="error-message">{regErrors.codigoDescuento}</span>}</div>
             <button type="submit" className="boton-submit">Registrarme</button>
          </form>
          <div className="switch-form">
            ¿Ya tienes una cuenta? <a onClick={() => setIsLoginView(true)} style={{cursor: 'pointer', color: 'blue'}}>Inicia Sesión aquí</a>
          </div>
        </section>
      )}
    </div>
  );
};

export default Login;