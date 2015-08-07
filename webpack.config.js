'use strict';

var path = require('path');

module.exports = {
  entry: {
    bundle: path.join(__dirname, 'example/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'example')
  }
};
