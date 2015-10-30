'use strict';

const keys = require('when/keys');
const pipeline = require('when/pipeline');

const { saveFileSuccess, saveFileError } = require('../creators');
const { writeFile, listCwd } = require('../methods');

function write(filename, content, silent){
  return writeFile(filename, content).yield({filename, silent});
}

function getData({ filename, silent }){
  return keys.all({
    filename,
    listing: listCwd(),
    silent
  });
}

const seq = [
  write,
  getData,
  saveFileSuccess
];

function saveFile(filename, content, silent){
  return pipeline(seq, filename, content, silent)
    .catch((err) => saveFileError(filename, err));
}

module.exports = saveFile;
