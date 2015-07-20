'use strict';

const pipeline = require('when/pipeline');

const filer = require('../filer');
const readAsText = require('../utils/read-as-text');

// to avoid args being passed to init
function init(filepath){
  return filer.init().yield(filepath);
}

function open(filepath){
  return filer.open(filepath);
}

const seq = [
  init,
  open,
  readAsText
];

function readFile(filepath){
  return pipeline(seq, filepath);
}

module.exports = readFile;
