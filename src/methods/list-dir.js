'use strict';

const pipeline = require('when/pipeline');

const filer = require('../filer');

// to avoid args being passed to init
function init(dirpath){
  return filer.init().yield(dirpath);
}

function list(dirpath){
  return filer.ls(dirpath);
}

function mapEntries(entry){
  if(entry.isFile){
    return {
      type: 'file',
      name: entry.name,
      fullPath: entry.fullPath
    };
  }

  if(entry.isDirectory){
    return {
      type: 'directory',
      name: entry.name,
      fullPath: entry.fullPath
    };
  }

  return {
    type: 'unknown',
    name: entry.name,
    fullPath: entry.fullPath
  };
}

function getEntries(entries){
  return entries.map(mapEntries);
}

const seq = [
  init,
  list,
  getEntries
];

function listDir(dirpath){
  return pipeline(seq, dirpath);
}

module.exports = listDir;
