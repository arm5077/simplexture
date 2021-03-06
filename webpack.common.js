const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this',
    library: {
      name: 'Simplexture',
      type: 'umd',
    },
  },
  resolve: {
    alias: {
      Constants: path.resolve(__dirname, './src/constants'),
      Common: path.resolve(__dirname, './src/common'),
      Src: path.resolve(__dirname, './src'),
    },
  },
};
