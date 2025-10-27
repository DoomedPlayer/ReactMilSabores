/**
 * @param {Array} allProducts 
 * @param {Array} activeTypeFilters 
 * @param {String|null} activeCategoryFilter
 * @returns {Array} 
 */
function filterProducts(allProducts, activeTypeFilters, activeCategoryFilter) {
  return allProducts.filter(product => {
    if (activeTypeFilters.length > 0) {
      return activeTypeFilters.includes(product.type);
    }
    if (activeCategoryFilter) {
      return product.category === activeCategoryFilter;
    }
    return true;
  });
}