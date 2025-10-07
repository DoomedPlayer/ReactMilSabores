// src/pages/Home.jsx (Asegúrate de que Hero y Community usen onNavigate)
import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import Promotions from '../components/Promotion';
import CommunitySection from '../components/ComunitySection';

// Simulación de datos
const featuredProductsData = [
  { id: 1, name: 'Torta Cuadrada de Chocolate', price: '$45.000 CLP', image: '/img/chocolate.jpg' },
  { id: 2, name: 'Tiramisú Clásico', price: '$5.000 CLP', image: '/img/tiramisu.jpg' },
  {id:3,name:'Torta Circular de Manjar', price: '$45.000 CLP', image:'/img/manjar.jpg'}
];

// Home recibe onNavigate desde App.jsx
const Home = ({ onNavigate }) => { 
  return (
    <main>
      {/* Pasa onNavigate al Hero para el botón de catálogo */}
      <HeroSection onNavigate={onNavigate} /> 
      
      <section id="featured-products" className="products-section">
        <h2>Nuestros Productos Destacados</h2>
        <div className="products-grid">
          {featuredProductsData.map(product => (
            // ProductCard no necesita onNavigate si su botón es solo "Añadir al Carrito"
            <ProductCard key={product.id} product={product} /> 
          ))}
        </div>
        <div className="btn-center">
          {/* El botón "Ver más Productos" también usa onNavigate */}
          <a href="#catalogo" onClick={() => onNavigate('catalogo')} className="btn">Ver más Productos</a>
        </div>
      </section>

      <Promotions />
      
      {/* Pasa onNavigate a CommunitySection para el botón de blog */}
      <CommunitySection onNavigate={onNavigate} />
    </main>
  );
};

export default Home;