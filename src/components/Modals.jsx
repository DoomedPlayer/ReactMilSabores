import React, { useState } from 'react';

export const CartModal = ({ isCartModalOpen, setIsCartModalOpen, cart, cartTotal, totalItems }) => (
    <div className={`cart-modal ${isCartModalOpen ? 'show' : ''}`}>
        <div className="cart-content">
            <span className="close-button" onClick={() => setIsCartModalOpen(false)}>&times;</span>
            <h2>Tu Carrito de Compras</h2>
            <div id="cart-items">
                {cart.length === 0 ? (
                    <p>Tu carrito está vacío.</p>
                ) : (
                    cart.map((item, index) => {
                        const itemTotal = item.price * item.quantity;
                        const optionsDisplay = item.size || item.message 
                            ? ` (${item.size || ''}${item.size && item.message ? ', ' : ''}${item.message || ''})`
                            : '';

                        return (
                            <div key={item.code + index}> 
                                <span>{item.name} ({item.quantity}){optionsDisplay}</span>
                                <span>${itemTotal.toLocaleString('es-CL')} CLP</span>
                            </div>
                        );
                    })
                )}
            </div>
            <div className="cart-summary">
                <h3>Total: <span id="cart-total">${cartTotal} CLP</span></h3>
            </div>
            <button className="view-cart-button" onClick={() => window.location.href='carrito.html'}>
                Finalizar Compra
            </button>
        </div>
    </div>
);

export const ProductDetailModal = ({ isDetailModalOpen, selectedProduct, closeDetailModal, addToCart }) => {
    const [detailOptions, setDetailOptions] = useState({ size: 'pequeño', message: '' });

    if (!selectedProduct) return null;

    const isCake = selectedProduct.category.includes('Tortas');
    const productName = encodeURIComponent(selectedProduct.name);
    const productUrl = encodeURIComponent(window.location.href); 
    const hashtags = 'Pasteleria1000Sabores,PasteleriaArtesanal,Postres';

    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${productUrl}&quote=¡Mira esta deliciosa ${productName} de Pastelería 1000 Sabores!`;
    const twitterLink = `https://twitter.com/intent/tweet?url=${productUrl}&text=¡Me encanta esta ${productName} de Pastelería 1000 Sabores!&hashtags=${hashtags}`;
    const whatsappLink = `https://api.whatsapp.com/send?text=¡Mira esta deliciosa ${productName} de Pastelería 1000 Sabores! Más detalles aquí: ${productUrl}`;

    /**
     * Añade el producto seleccionado del modal al carrito con sus opciones.
     */
    const handleAddToCartFromDetail = () => {
        addToCart({
            ...selectedProduct,
            size: isCake ? detailOptions.size : undefined,
            message: isCake ? detailOptions.message : undefined,
        });
        closeDetailModal();
        setDetailOptions({ size: 'pequeño', message: '' }); // Reset local state on close
    };

    return (
        <div className={`product-detail-modal ${isDetailModalOpen ? 'show' : ''}`}>
            <div className="product-detail-content">
                <span className="close-button-detail" onClick={closeDetailModal}>&times;</span>
                <div id="product-detail-info">
                    <img src={`img/${selectedProduct.image}`} alt={selectedProduct.name} width="300" height="250" />
                    <div className="info-section">
                        <h2>{selectedProduct.name}</h2>
                        <div className="social-icons">
                            <a href={facebookLink} target="_blank" rel="noopener noreferrer" title="Compartir en Facebook">
                                {/* Asumiendo que las imágenes sociales están disponibles */}
                                <img src="img/facebook.png" alt="Compartir en Facebook" />
                            </a>
                            <a href={twitterLink} target="_blank" rel="noopener noreferrer" title="Compartir en Twitter">
                                <img src="img/twitter.png" alt="Compartir en Twitter" />
                            </a>
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" title="Compartir por WhatsApp">
                                <img src="img/whatsapp.png" alt="Compartir por WhatsApp" />
                            </a>
                        </div>
                        <p><strong>Categoría:</strong> {selectedProduct.category}</p>
                        <p><strong>Precio:</strong> ${selectedProduct.price.toLocaleString('es-CL')} CLP</p>
                        <p>{selectedProduct.description}</p>
                        
                        {isCake && (
                            <>
                                <label htmlFor="size-select">Tamaño:</label>
                                <select 
                                    id="size-select" 
                                    value={detailOptions.size} 
                                    onChange={(e) => setDetailOptions(prev => ({ ...prev, size: e.target.value }))}
                                >
                                    <option value="pequeño">Pequeño</option>
                                    <option value="mediano">Mediano</option>
                                    <option value="grande">Grande</option>
                                </select>
                                
                                <label htmlFor="message-input">Mensaje especial:</label>
                                <textarea 
                                    id="message-input" 
                                    rows="4" 
                                    placeholder="Escribe un mensaje aquí..."
                                    value={detailOptions.message}
                                    onChange={(e) => setDetailOptions(prev => ({ ...prev, message: e.target.value }))}
                                ></textarea>
                            </>
                        )}

                        <button className="add-to-cart-detail" onClick={handleAddToCartFromDetail}>
                            Añadir al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};