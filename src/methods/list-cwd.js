'use strict';

const listDir = require('./list-dir');

function listCwd(){
  return listDir('.');
}

module.exports = listCwd;
