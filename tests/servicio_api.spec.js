describe('ServicioAPI (Prueba con Mocking)', () => {
  let servicioAPI;
  
  // 1. Configuración: Creamos un objeto simulado (mock/spy)
  beforeEach(() => {
    // Creamos un objeto que finge ser ServicioAPI con un método getData
    servicioAPI = jasmine.createSpyObj('ServicioAPI', ['getData']);
    
    // Le decimos al método getData qué valor debe DEVOLVER
    servicioAPI.getData.and.returnValue(Promise.resolve({ data: 'datos simulados' }));
  });
  
  // 2. La Prueba: Verificamos que nuestro código llame al servicio simulado
  it('debería confirmar que se llamó al método getData simulado', async () => {
    // Ejecutamos el método simulado
    await servicioAPI.getData(); 
    
    // Afirmamos que el método fue invocado
    expect(servicioAPI.getData).toHaveBeenCalled(); 
  });
});