'use strict';

const path = require('path');

const sequence = require('when/sequence');

const filer = require('../filer');

// to avoid args being passed to init
function init(){
  return filer.init();
}

function mkdir(filepath){
  const dirpath = path.dirname(filepath);

  return filer.mkdir(dirpath, false);
}

function write(filepath, text){
  return filer.write(filepath, { data: text, type: 'text/plain' });
}

const seq = [
  init,
  mkdir,
  write
];

function writeFile(filepath, text){
  return sequence(seq, filepath, text);
}

module.exports = writeFile;
