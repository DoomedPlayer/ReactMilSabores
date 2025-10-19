import React, { useState, useCallback, useMemo } from 'react';
import { initialProducts } from '../data/productos';
import ProductCard from '../components/ProductCardCat';
import Sidebar from '../components/Sidebar';
import { CartModal, ProductDetailModal } from '../components/Modals';

/**
 * @returns {JSX.Element}
 * @param {object} props
 */
function Catalogo({ cart, addToCart, cartTotal, totalItems }) {

    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeTypeFilters, setActiveTypeFilters] = useState([]);
    const [activeCategoryFilter, setActiveCategoryFilter] = useState(null);
    
    const handleTypeFilterChange = (e) => {
        const filterValue = e.target.dataset.filter;
        setActiveCategoryFilter(null); 

        setActiveTypeFilters(prevFilters => {
            if (e.target.checked) {
                return [...prevFilters, filterValue];
            } else {
                return prevFilters.filter(f => f !== filterValue);
            }
        });
    };

    const handleCategoryFilterClick = useCallback((category) => {
        setActiveCategoryFilter(category);
        setActiveTypeFilters([]);
    }, []);

    const handleShowAllProducts = () => {
        setActiveTypeFilters([]);
        setActiveCategoryFilter(null);
    };

    const filteredProducts = useMemo(() => {
        return initialProducts.filter(product => {
            if (activeTypeFilters.length > 0) {
                return activeTypeFilters.includes(product.type);
            }

            if (activeCategoryFilter) {
                return product.category === activeCategoryFilter;
            }

            return true;
        });
    }, [activeTypeFilters, activeCategoryFilter]);

    const showProductDetails = useCallback((product) => {
        setSelectedProduct(product);
        setIsDetailModalOpen(true);
    }, []);

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    return (
        <>
            <main className="catalog-layout">
                <Sidebar 
                    initialProducts={initialProducts}
                    activeTypeFilters={activeTypeFilters}
                    activeCategoryFilter={activeCategoryFilter}
                    handleTypeFilterChange={handleTypeFilterChange}
                    handleCategoryFilterClick={handleCategoryFilterClick}
                    handleShowAllProducts={handleShowAllProducts}
                />

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

        </>
    );
}

export default Catalogo;