'use strict';

var path = require('path');

var isTest = (process.argv.indexOf('--test') !== -1);

var loaders = [
  {
    test: /\.js$/,
    exclude: [
      /node_modules/
    ],
    loaders: [
      'babel-loader'
    ]
  }
];

if(isTest){
  loaders.push({
    test: /\.js$/,
    exclude: [
      /__tests__/,
      /node_modules/
    ],
    loader: 'isparta-loader'
  })
}

module.exports = {
  entry: {
    bundle: path.join(__dirname, 'example/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'example')
  },
  module: {
    loaders: loaders
  }
};
