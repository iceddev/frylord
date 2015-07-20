'use strict';

const sequence = require('when/sequence');

const filer = require('../filer');

// to avoid args being passed to init
function init(){
  return filer.init();
}

function remove(filepath){
  return filer.rm(filepath);
}

const seq = [
  init,
  remove
];

function removeFile(filepath){
  return sequence(seq, filepath);
}

module.exports = removeFile;
