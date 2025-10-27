import React from 'react';
import { FaTachometerAlt, FaShoppingCart, FaBox, FaTags, FaUsers, FaChartLine, FaUserCircle, FaStore, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="sidebar-admin">
      <div className="company-name">My Admin</div>
      <nav>
        <ul>
          <li><a href="#" className="active"><FaTachometerAlt /> Dashboard</a></li>
          <li><a href="#"><FaShoppingCart /> Órdenes</a></li>
          <li><a href="#"><FaBox /> Productos</a></li>
          <li><a href="#"><FaTags /> Categorías</a></li>
          <li><a href="#"><FaUsers /> Usuarios</a></li>
          <li><a href="#"><FaChartLine /> Reportes</a></li>
          <hr style={{ borderTop: '1px solid #4a627d', margin: '20px 0' }} />
          <li><a href="#"><FaUserCircle /> Perfil</a></li>
          <li><a href="#"><FaStore /> Tienda</a></li>
        </ul>
      </nav>
      <button className="logout-button"><FaSignOutAlt /> Cerrar Sesión</button>
    </aside>
  );
};

export default Sidebar;