describe('Pruebas de la función logicAddToCart', () => {

  it('debería agregar un nuevo producto a un carrito vacío', () => {
    const carritoInicial = [];
    const producto = { code: 'P1', name: 'Torta', price: 10000 };
    
    const nuevoCarrito = logicAddToCart(carritoInicial, producto);

    expect(nuevoCarrito).toEqual([
      { code: 'P1', name: 'Torta', price: 10000, quantity: 1, size: undefined, message: undefined }
    ]);
  });

  it('debería incrementar la cantidad de un producto existente', () => {
    const carritoInicial = [
      { code: 'P1', name: 'Torta', price: 10000, quantity: 1 }
    ];
    const producto = { code: 'P1', name: 'Torta', price: 10000 };
    
    const nuevoCarrito = logicAddToCart(carritoInicial, producto);
    
    expect(nuevoCarrito.length).toBe(1);
    expect(nuevoCarrito[0].quantity).toBe(2);
  });

  it('debería agregar un segundo producto diferente', () => {
    const carritoInicial = [
      { code: 'P1', name: 'Torta', price: 10000, quantity: 1 }
    ];
    const productoNuevo = { code: 'P2', name: 'Kuchen', price: 5000 };
    
    const nuevoCarrito = logicAddToCart(carritoInicial, productoNuevo);
    
    expect(nuevoCarrito.length).toBe(2);
    expect(nuevoCarrito[1].code).toBe('P2');
  });

  it('debería actualizar el mensaje y tamaño si el producto ya existe', () => {
    const carritoInicial = [
      { code: 'P1', name: 'Torta', price: 10000, quantity: 1, size: 'M', message: 'Hola' }
    ];
    const productoActualizado = { code: 'P1', price: 10000, size: 'L', message: 'Adiós' };
    
    const nuevoCarrito = logicAddToCart(carritoInicial, productoActualizado);

    expect(nuevoCarrito.length).toBe(1);
    expect(nuevoCarrito[0].quantity).toBe(2);
    expect(nuevoCarrito[0].size).toBe('L');
    expect(nuevoCarrito[0].message).toBe('Adiós');
  });
});

describe('Pruebas de la función logicCalculateTotals', () => {

  it('debería devolver ceros para un carrito vacío', () => {
    const carrito = [];
    const totales = logicCalculateTotals(carrito);
    
    expect(totales.totalItems).toBe(0);
    expect(totales.cartTotal).toBe(0);
  });

  it('debería calcular los totales correctamente', () => {
    const carrito = [
      { code: 'P1', price: 10000, quantity: 2 }, // 20000
      { code: 'P2', price: 5000, quantity: 1 }   // 5000
    ];
    
    const totales = logicCalculateTotals(carrito);
    
    expect(totales.totalItems).toBe(3); // 2 + 1
    expect(totales.cartTotal).toBe(25000); // 20000 + 5000
  });
});