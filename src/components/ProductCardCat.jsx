import React from 'react';

const ProductCard = React.memo(({ product, onShowDetails, onAddToCart }) => (
    <div className="product-card">
        <img 
            src={`img/${product.image}`} 
            alt={product.name} 
            onClick={() => onShowDetails(product)}
        />
        <div className="product-info">
            <h3>{product.name}</h3>
            <p className="price">${product.price.toLocaleString('es-CL')} CLP</p>
            <div className="product-actions">
            <button className="action-button view-details" onClick={() => onShowDetails(product)}>
                Ver Detalles
            </button>
            <button className="action-button add-to-cart" onClick={() => onAddToCart(product)}>
                Añadir al Carrito
            </button>
            </div>
        </div>
    </div>
));

export default ProductCard;