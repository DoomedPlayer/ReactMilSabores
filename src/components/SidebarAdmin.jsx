import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaShoppingCart, FaBox, FaTags, FaUsers, FaChartLine, FaUserCircle, FaStore, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');

    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <aside className="sidebar-admin">
      <div className="company-name">Administración</div>
      <nav>
        <ul>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/admin'); }} className={isActive('/admin')}>
              <FaTachometerAlt /> Dashboard
            </a>
          </li>
          <li><a href="#"><FaShoppingCart /> Órdenes</a></li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/gestion'); }} className={isActive('/gestion')}>
                <FaBox /> Productos
            </a>
          </li>
          <li><a href="#">
            <FaTags /> Categorías
            </a>
          </li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/usuarios'); }} className={isActive('/usuarios')}><FaUsers /> Usuarios</a></li>
          <li><a href="#"><FaChartLine /> Reportes</a></li>
          <hr style={{ borderTop: '1px solid #4a627d', margin: '20px 0' }} />
          <li><a href="#"><FaUserCircle /> Perfil</a></li>
          <li><a href="#"><FaStore /> Tienda</a></li>
        </ul>
      </nav>
      <button className="logout-button" onClick={handleLogout}> <FaSignOutAlt /> Cerrar Sesión</button>
    </aside>
  );
};

export default Sidebar;