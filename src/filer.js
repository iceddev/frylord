'use strict';

const Filer = require('@phated/filer');
const callbacks = require('when/callbacks');

const filer = new Filer();

const methods = [
  'cd',
  'cp',
  'create',
  'df',
  'init',
  'ls',
  'mkdir',
  'mv',
  'open',
  'rm',
  'write'
];

methods.forEach((name) => filer[name] = callbacks.lift(filer[name]));

module.exports = filer;
