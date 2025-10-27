import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import '../heroCarousel.css'

const carouselImageStyle = {
  height: '500px',  
  objectFit: 'cover',
  width: '100%'
};

const HeroSection = () => {
  return (
    <section>
      <Carousel fade interval={5000}>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/img/hero1.png" 
            alt="Aniversario 50 años"
          />
          <Carousel.Caption className="custom-carousel-caption">
            <h1>¡50 Años de Dulzura y Tradición!</h1>
            <p>Renovamos nuestra experiencia de compra para celebrar nuestro aniversario y nuestra historia, desde el Récord Guinness de 1995.</p>
            <Link to="/catalogo" className="btn">Explora el Catálogo</Link>
          </Carousel.Caption>
        </Carousel.Item>
        
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/img/hero2.png"
            alt="Variedad de pasteles y postres"
          />
          <Carousel.Caption className="custom-carousel-caption">
            <h1>Descuento de por Vida</h1>
            <p dangerouslySetInnerHTML={{ __html: 'Regístrate con el código <strong>FELICES50</strong> y recibe un 10% de descuento de por vida.' }} />
            <Link to="/login" className="btn">Registrarse</Link>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="/img/hero3.png" 
            alt="Descuento Especial"
          />
          <Carousel.Caption className="custom-carousel-caption">
            <h1>Descuento Especial</h1>
            <p>Usuarios mayores de 50 años reciben un 50% de descuento en todos los productos.</p>
            <Link to="/catalogo" className="btn">Ver Productos</Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default HeroSection;