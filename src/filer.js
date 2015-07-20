'use strict';

const Filer = require('@phated/filer');
const callbacks = require('when/callbacks');

const filer = new Filer();

const opts = {
  persistent: true,
  size: 1024 * 1024
};

// init is handled separately to pass options and bind to the instance
filer.init = callbacks.lift(filer.init.bind(filer, opts));

const methods = [
  'cd',
  'cp',
  'create',
  'df',
  'ls',
  'mkdir',
  'mv',
  'open',
  'rm',
  'write'
];

methods.forEach((name) => filer[name] = callbacks.lift(filer[name]));

module.exports = filer;
