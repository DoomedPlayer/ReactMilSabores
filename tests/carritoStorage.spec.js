describe('Pruebas del Almacenamiento del Carrito (localStorage)', () => {

  let storageSpy;
  beforeEach(() => {
    storageSpy = spyOnAllFunctions(localStorage, 'getItem', 'setItem', 'removeItem');
  });

  it('debería guardar el carrito en localStorage usando setItem', () => {
    const carrito = [{ code: 'P1', quantity: 1 }];
    saveCart(carrito);
    expect(storageSpy.setItem).toHaveBeenCalledWith('cart', '[{"code":"P1","quantity":1}]');
  });

  it('debería cargar el carrito desde localStorage usando getItem', () => {
    storageSpy.getItem.and.returnValue('[{"code":"P2","quantity":2}]');

    const carrito = loadCart();

    expect(storageSpy.getItem).toHaveBeenCalledWith('cart');
    expect(carrito).toEqual([{ code: 'P2', quantity: 2 }]);
  });
  
  it('debería devolver un carrito vacío si localStorage está vacío', () => {
    storageSpy.getItem.and.returnValue(null);
    
    const carrito = loadCart();
    
    expect(carrito).toEqual([]);
  });
  
  it('debería llamar a removeItem si el carrito está vacío', () => {
    saveCart([]);

    expect(storageSpy.removeItem).toHaveBeenCalledWith('cart');
    expect(storageSpy.setItem).not.toHaveBeenCalled();
  });
});