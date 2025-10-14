module.exports = function(config) {
  config.set({
     
    // Framework: Usamos Jasmine
    frameworks: ['jasmine'], 

    // Solo cargamos los archivos de lógica simple y la prueba
    files: [
      'src/calculadora.js',       // El código de la función
      'tests/calculadora.spec.js', // El código de la prueba
      'tests/servicio_api.spec.js'
    ],

    // Quitamos los preprocesadores (Webpack) si los añadiste antes
    preprocessors: {}, 

    // Navegador sin cabeza (Headless)
    browsers: ['ChromeHeadless'], 

    // Ejecutar una sola vez
    singleRun: true 
  });
};