// Catalogo.jsx
import React, { useState, useCallback, useMemo } from 'react';
import { initialProducts } from '../data/productos';
import ProductCard from '../components/ProductCardCat';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';  
import Sidebar from '../components/Sidebar';
import { CartModal, ProductDetailModal } from '../components/Modals';
import '../catalogo.css'; // Importa el archivo CSS

/**
 * Componente principal del Catálogo
 * @returns {JSX.Element}
 * @param {object} props - Propiedades del componente.
 * @param {function} props.onNavigate El componente del catálogo de productos.
 */
function Catalogo() {
    // --- Estado ---
    const [cart, setCart] = useState([]);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeTypeFilters, setActiveTypeFilters] = useState([]);
    const [activeCategoryFilter, setActiveCategoryFilter] = useState(null);
    
    // --- Lógica del Carrito ---

    /**
     * Calcula la cantidad total de artículos y el precio total.
     */
    const { totalItems, cartTotal } = useMemo(() => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return { totalItems, cartTotal: cartTotal.toLocaleString('es-CL') };
    }, [cart]);

    /**
     * Añade un producto al carrito, manejando el incremento de cantidad y opciones.
     */
    const addToCart = useCallback((product) => {
        setCart(prevCart => {
            // Buscar un item existente con el mismo código
            const existingItemIndex = prevCart.findIndex(item => item.code === product.code);
            
            if (existingItemIndex > -1) {
                // El producto existe, actualizar cantidad y opciones (si vienen)
                return prevCart.map((item, index) => 
                    index === existingItemIndex
                        ? { 
                            ...item, 
                            quantity: item.quantity + 1,
                            message: product.message !== undefined ? product.message : item.message,
                            size: product.size !== undefined ? product.size : item.size,
                        }
                        : item
                );
            } else {
                // El producto es nuevo
                return [...prevCart, { ...product, quantity: 1, size: product.size, message: product.message }];
            }
        });
    }, []);

    // --- Lógica de Filtros ---

    /**
     * Maneja el cambio en los checkboxes de 'Tipo de Torta'.
     */
    const handleTypeFilterChange = (e) => {
        const filterValue = e.target.dataset.filter;
        setActiveCategoryFilter(null); // Reset category filter

        setActiveTypeFilters(prevFilters => {
            if (e.target.checked) {
                return [...prevFilters, filterValue];
            } else {
                return prevFilters.filter(f => f !== filterValue);
            }
        });
    };

    /**
     * Maneja la selección de un link de categoría.
     */
    const handleCategoryFilterClick = useCallback((category) => {
        setActiveCategoryFilter(category);
        setActiveTypeFilters([]); // Reset type filters
        // No es necesario manipular el DOM de los checkboxes en React, el estado lo controla.
    }, []);

    /**
     * Restablece todos los filtros.
     */
    const handleShowAllProducts = () => {
        setActiveTypeFilters([]);
        setActiveCategoryFilter(null);
    };

    /**
     * Aplica los filtros activos a la lista de productos (Memoizado).
     */
    const filteredProducts = useMemo(() => {
        return initialProducts.filter(product => {
            // Filtrar por 'Tipo de Torta' (checkboxes)
            if (activeTypeFilters.length > 0) {
                return activeTypeFilters.includes(product.type);
            }

            // Filtrar por 'Categoría' (links)
            if (activeCategoryFilter) {
                return product.category === activeCategoryFilter;
            }

            // Si no hay filtros activos
            return true;
        });
    }, [activeTypeFilters, activeCategoryFilter]);

    // --- Lógica del Modal de Detalles ---

    /**
     * Muestra el modal de detalles de un producto.
     */
    const showProductDetails = useCallback((product) => {
        setSelectedProduct(product);
        setIsDetailModalOpen(true);
    }, []);

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
        // setSelectedProduct(null); // No es necesario, el modal se oculta
    };

    // --- Renderizado ---
    return (
        <>
            <Navbar onNavigate={onNavigate} totalItems={totalItems} /> 

            <main>
                {/* Sidebar y Filtros */}
                <Sidebar 
                    initialProducts={initialProducts}
                    activeTypeFilters={activeTypeFilters}
                    activeCategoryFilter={activeCategoryFilter}
                    handleTypeFilterChange={handleTypeFilterChange}
                    handleCategoryFilterClick={handleCategoryFilterClick}
                    handleShowAllProducts={handleShowAllProducts}
                />

                {/* Catálogo de Productos */}
                <section className="catalog" id="product-catalog">
                    {filteredProducts.map(product => (
                        <ProductCard 
                            key={product.code} 
                            product={product} 
                            onShowDetails={showProductDetails} 
                            onAddToCart={addToCart} 
                        />
                    ))}
                    {filteredProducts.length === 0 && (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No se encontraron productos con los filtros seleccionados.</p>
                    )}
                </section>
            </main>

            {/* Modales */}
            <ProductDetailModal
                isDetailModalOpen={isDetailModalOpen}
                selectedProduct={selectedProduct}
                closeDetailModal={closeDetailModal}
                addToCart={addToCart}
            />

            <CartModal
                isCartModalOpen={isCartModalOpen}
                setIsCartModalOpen={setIsCartModalOpen}
                cart={cart}
                cartTotal={cartTotal}
                totalItems={totalItems}
            />

            <Footer />
        </>
    );
}

export default Catalogo;