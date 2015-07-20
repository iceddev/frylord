'use strict';

const pipeline = require('when/pipeline');

const filer = require('../filer');

function getNames(entries){
  return entries.map((entry) => entry.name);
}

function listDirectory(dirname){
  const seq = [
    filer.init,
    () => filer.ls(dirname),
    getNames
  ];

  return pipeline(seq);
}

module.exports = listDirectory;
