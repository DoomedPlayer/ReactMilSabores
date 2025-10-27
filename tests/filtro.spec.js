const mockProducts = [
  { code: 'A', category: 'Tortas', type: 'cuadrada' },
  { code: 'B', category: 'Tortas', type: 'circular' },
  { code: 'C', category: 'Postres', type: 'individual' },
  { code: 'D', category: 'Postres', type: 'individual' },
  { code: 'E', category: 'Especiales', type: 'vegana' }
];

describe('Pruebas de la Lógica de Filtros (filterProducts)', () => {

  it('debería devolver todos los productos si no hay filtros activos', () => {
    const filters = {
      activeTypeFilters: [],
      activeCategoryFilter: null
    };
    
    const result = filterProducts(mockProducts, filters.activeTypeFilters, filters.activeCategoryFilter);

    expect(result.length).toBe(5);
    expect(result).toEqual(mockProducts);
  });

  it('debería filtrar por Categoría (ej. click en "Postres")', () => {
    const filters = {
      activeTypeFilters: [],
      activeCategoryFilter: 'Postres' 
    };

    const result = filterProducts(mockProducts, filters.activeTypeFilters, filters.activeCategoryFilter);

    expect(result.length).toBe(2);
    expect(result.map(p => p.code)).toEqual(['C', 'D']); 
  });

  it('debería filtrar por un solo Tipo (ej. checkbox "cuadrada")', () => {
    const filters = {
      activeTypeFilters: ['cuadrada'], 
      activeCategoryFilter: null
    };

    const result = filterProducts(mockProducts, filters.activeTypeFilters, filters.activeCategoryFilter);

    expect(result.length).toBe(1);
    expect(result[0].code).toBe('A');
  });

  it('debería filtrar por múltiples Tipos (ej. checkboxes "cuadrada" y "vegana")', () => {
    const filters = {
      activeTypeFilters: ['cuadrada', 'vegana'],
      activeCategoryFilter: null
    };

    const result = filterProducts(mockProducts, filters.activeTypeFilters, filters.activeCategoryFilter);

    expect(result.length).toBe(2);
    expect(result.map(p => p.code)).toEqual(['A', 'E']);
  });

  it('debería priorizar el filtro de Tipo si ambos están activos', () => {
    const filters = {
      activeTypeFilters: ['vegana'], 
      activeCategoryFilter: 'Tortas' 
    };

    const result = filterProducts(mockProducts, filters.activeTypeFilters, filters.activeCategoryFilter);
    expect(result.length).toBe(1);
    expect(result[0].code).toBe('E');
  });
  
  it('debería devolver un array vacío si ningún producto coincide con el filtro', () => {
    const filters = {
      activeTypeFilters: [],
      activeCategoryFilter: 'Sin Gluten' 
    };

    const result = filterProducts(mockProducts, filters.activeTypeFilters, filters.activeCategoryFilter);

    expect(result.length).toBe(0);
  });
});