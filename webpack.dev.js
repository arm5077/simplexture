const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const dev = merge(common, {
  mode: 'development',
  output: {
    filename: 'simplexture.development.js',
  },
  devServer: {
    static: './',
    open: ['/dev'],
  },
});

module.exports = dev;
