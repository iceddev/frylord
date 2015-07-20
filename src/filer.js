'use strict';

const Filer = require('@phated/filer');
const callbacks = require('when/callbacks');

const filer = new Filer();

const opts = {
  persistent: true,
  size: 1024 * 1024
};

const methods = [
  'cd',
  'cp',
  'create',
  'df',
  // init is handled separately to pass options and bind to the instance
  // 'init',
  'ls',
  'mkdir',
  'mv',
  'open',
  'rm',
  'write'
];

filer.init = callbacks.lift(filer.init.bind(filer, opts));

methods.forEach((name) => filer[name] = callbacks.lift(filer[name]));

module.exports = filer;
