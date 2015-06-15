'use strict';

var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './test/chrome/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        loaders: [
          'babel-loader?optional=runtime'
        ]
      }
    ]
  },
  resolveLoader: {
    // this is a workaround for loaders being applied
    // to linked modules
    root: path.join(__dirname, 'node_modules')
  },
  resolve: {
    // this is a workaround for aliasing a top level dependency
    // inside a symlinked subdependency
    root: path.join(__dirname, 'node_modules'),
    alias: {
      // replacing `fs` with a browser-compatible version
      fs: 'chrome-sync-fs',
      'graceful-fs': 'chrome-sync-fs'
    }
  },
  bail: true
};
