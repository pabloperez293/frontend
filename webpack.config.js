const path = require('path');

module.exports = {
  entry: './src/index.js', // Ruta al punto de entrada de tu aplicación
  output: {
    filename: 'bundle.js', // Nombre del archivo de salida
    path: path.resolve(__dirname, 'dist'), // Ruta de salida para los archivos compilados
  },
  module: {
    rules: [
      // Define reglas para cargar diferentes tipos de archivos, como JavaScript, CSS, etc.
      {
        test: /\.js$/,
        use: 'babel-loader', // Ejemplo: usando Babel para transpilar JavaScript
        exclude: /node_modules/,
      },
    ],
  },
};
