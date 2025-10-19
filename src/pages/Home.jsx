import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import Promotions from '../components/Promotion';
import CommunitySection from '../components/ComunitySection';
import { Link } from 'react-router-dom';

const featuredProductsData = [
  { id: 1, name: 'Torta Cuadrada de Chocolate', price: '$45.000 CLP', image: '/img/chocolate.jpg' },
  { id: 2, name: 'Tiramisú Clásico', price: '$5.000 CLP', image: '/img/tiramisu.jpg' },
  {id:3,name:'Torta Circular de Manjar', price: '$45.000 CLP', image:'/img/manjar.jpg'}
];

const Home = () => { 
  return (
    <>
    <main>
      <HeroSection /> 
      
      <section id="featured-products" className="products-section">
        <h2>Nuestros Productos Destacados</h2>
        <div className="products-grid">
          {featuredProductsData.map(product => (
            <ProductCard key={product.id} product={product} /> 
          ))}
        </div>
        <div className="btn-center">
          <Link to ="/catalogo" className="btn">Ver más Productos</Link>
        </div>
      </section>

      <Promotions />

      <CommunitySection />
    </main>
    </>
  );
};

export default Home;