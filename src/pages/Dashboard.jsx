import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SidebarAdmin'
import Header from '../components/HeadAdmin';
import MetricCard from '../components/MetricCardAdmin';
import DashboardCard from '../components/DashboardCardAdmin';
import { FaShoppingCart, FaBox, FaUsers, FaTachometerAlt, FaClipboardList, FaTags, FaChartLine, FaUserCircle, FaStore } from 'react-icons/fa';
import "../dashboard.css"
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <main className="main-content">
      <div className='sidebar'>
        <Sidebar />
      </div>
      
      <div className="content-wrapper">
        <Header title="Dashboard" />

        <div className="metric-cards-container">
          <MetricCard
            icon={<FaShoppingCart />}
            title="Compras"
            value="1,234"
            description="Probabilidad de aumento: 20%"
            className="purchases"
          />
          <MetricCard
            icon={<FaBox />}
            title="Productos"
            value="400"
            description="Inventario actual: 500"
            className="products"
          />
          <MetricCard
            icon={<FaUsers />}
            title="Usuarios"
            value="890"
            description="Nuevos usuarios hoy: 120"
            className="users"
          />
        </div>

        <div className="dashboard-cards-container">
          <DashboardCard
            icon={<FaTachometerAlt />}
            title="Dashboard"
            description="Visión general de todas las métricas y estadísticas clave del sistema."
          />
          <DashboardCard
            icon={<FaClipboardList />}
            title="Órdenes"
            description="Gestión y seguimiento de todas las órdenes de compra realizadas."
          />
          <div 
            onClick={() => navigate('/gestion')} 
            style={{ cursor: 'pointer' }}
          >
            <DashboardCard
              icon={<FaBox />}
              title="Productos"
              description="Administrar inventario y detalles de los productos disponibles."
            />
          </div>
          <DashboardCard
            icon={<FaTags />}
            title="Categorías"
            description="Organizar productos en categorías para facilitar su navegación."
          />
          <div 
            onClick={() => navigate('/usuarios')} 
            style={{ cursor: 'pointer' }}
          >
          <DashboardCard
            icon={<FaUsers />}
            title="Usuarios"
            description="Gestión de cuentas de usuario y sus roles dentro del sistema."
          />
          </div>
          <DashboardCard
            icon={<FaChartLine />}
            title="Reportes"
            description="Generación de informes detallados sobre las operaciones del sistema."
          />
          <DashboardCard
            icon={<FaUserCircle />}
            title="Perfil"
            description="Administración de la información personal y configuraciones de cuenta."
          />
          <DashboardCard
            icon={<FaStore />}
            title="Tienda"
            description="Visualiza tu tienda en tiempo real, actualiza los reportes de los usuarios."
          />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;