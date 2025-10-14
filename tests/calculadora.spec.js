describe('Pruebas de la función Sumar', function() {
  
  it('debería sumar dos números positivos correctamente', function() {
    // Afirmación de Jasmine: 5 + 3 debe ser igual a 8
    expect(sumar(5, 3)).toBe(8);
  });

  it('debería devolver el mismo número al sumar cero', function() {
    expect(sumar(10, 0)).toBe(10);
  });
});

describe('Pruebas de la función Restar', function() {
  
  it('debería restar dos números correctamente', function() {
    expect(restar(10, 4)).toBe(6);
  });
});