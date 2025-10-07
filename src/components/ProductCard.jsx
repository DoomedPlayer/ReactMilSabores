import React from 'react';

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    console.log(`Producto ${product.name} añadido al carrito.`);
  };

  return (
    <div className="card">
      {}
      <img src={product.image} alt={product.name} width="300" height="250" />
      <h3>{product.name}</h3>
      <p className="price">{product.price}</p>
      {}
      <button onClick={handleAddToCart} className="btn">Añadir al Carrito</button>
    </div>
  );
};

export default ProductCard;