import React from 'react';

const ProductCard = ({ product, onAddToCart}) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

return (
    <div className="product-card"> 
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toLocaleString('es-CL')}</p>
        <button 
          className="btn btn-primary"
          onClick={handleAddToCart}
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;