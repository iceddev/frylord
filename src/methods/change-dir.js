'use strict';

const pipeline = require('when/pipeline');

const filer = require('../filer');

// to avoid args being passed to init
function init(dirpath){
  return filer.init().yield(dirpath);
}

function mkdir(dirpath){
  return filer.mkdir(dirpath).yield(dirpath);
}

function cd(dirpath){
  return filer.cd(dirpath);
}

function getPath(entry){
  return entry.fullPath;
}

const seq = [
  init,
  mkdir,
  cd,
  getPath
];

function changeDir(dirpath){
  return pipeline(seq, dirpath);
}

module.exports = changeDir;
