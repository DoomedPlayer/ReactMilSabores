import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import Promotions from '../components/Promotion';
import CommunitySection from '../components/ComunitySection';
import { Link } from 'react-router-dom';

const featuredProductsData = [
  { code: 1, name: 'Torta Cuadrada de Chocolate', price: 45000 , image: '/img/chocolate.jpg' },
  { code: 2, name: 'Tiramisú Clásico', price: 5000, image: '/img/tiramisu.jpg' },
  { code: 3,name:'Torta Circular de Manjar', price: 45000 , image:'/img/manjar.jpg'}
];

const Home = ({addToCart}) => { 
  return (
    <>
    <main>
      <HeroSection /> 
      
      <section id="featured-products" className="products-section">
        <h2>Nuestros Productos Destacados</h2>
        <div className="products-grid">
          {featuredProductsData.map(product => (
            <ProductCard 
              key={product.code} 
              product={product} 
              onAddToCart={addToCart}
            /> 
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