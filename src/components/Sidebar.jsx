import React from 'react';

const Sidebar = ({ initialProducts, activeTypeFilters, activeCategoryFilter, handleTypeFilterChange, handleCategoryFilterClick, handleShowAllProducts }) => {
    const categories = Array.from(new Set(initialProducts.map(p => p.category)));
    
    return (
        <aside className="sidebar">
            <h2>Filtros</h2>
            <div className="filter-group">
                <h3>Tipo de Torta</h3>
                <label>
                    <input 
                        type="checkbox" 
                        data-filter="cuadrada" 
                        checked={activeTypeFilters.includes('cuadrada')}
                        onChange={handleTypeFilterChange}
                    /> Cuadrada
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        data-filter="circular" 
                        checked={activeTypeFilters.includes('circular')}
                        onChange={handleTypeFilterChange}
                    /> Circular
                </label>
            </div>
            <div className="filter-group">
                <h3>Categorías</h3>
                <ul id="category-list">
                    {categories.map(category => (
                        <li key={category}>
                            <a 
                                href="#" 
                                data-category={category}
                                onClick={(e) => { e.preventDefault(); handleCategoryFilterClick(category); }}
                                style={{ fontWeight: activeCategoryFilter === category ? 'bold' : 'normal' }}
                            >
                                {category}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <button id="show-all-products" className="clear-filters-btn" onClick={handleShowAllProducts}>
                Ver Todos los Productos
            </button>
        </aside>
    );
};

export default Sidebar;