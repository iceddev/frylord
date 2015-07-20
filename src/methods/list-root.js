'use strict';

const listDir = require('./list-dir');

function listRoot(){
  return listDir('/');
}

module.exports = listRoot;
