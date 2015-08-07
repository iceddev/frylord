'use strict';

const nodefn = require('when/node');
const levelup = require('levelup');
const leveljs = require('level-js');

const db = levelup('temp-files', {
  db: leveljs,
  valueEncoding: 'json'
});

const methods = [
  'get',
  'put',
  'del'
];

methods.forEach((name) => db[name] = nodefn.lift(db[name].bind(db)));

module.exports = db;
