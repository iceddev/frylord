'use strict';

const pipeline = require('when/pipeline');

const filer = require('../filer');
const readAsText = require('../utils/read-as-text');

function readFile(filename){
  const seq = [
    filer.init,
    () => filer.open(filename),
    readAsText
  ];

  return pipeline(seq);
}

module.exports = readFile;
