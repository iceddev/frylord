'use strict';

const keys = require('when/keys');
const pipeline = require('when/pipeline');

const { saveFileSuccess, saveFileError } = require('../creators');
const { writeFile, listCwd } = require('../methods');

function write(filename, content){
  return writeFile(filename, content).yield(filename);
}

function getData(filename){
  return keys.all({
    filename,
    listing: listCwd()
  });
}

const seq = [
  write,
  getData,
  saveFileSuccess
];

function saveFile(filename, content){
  return pipeline(seq, filename, content)
    .catch((err) => saveFileError(filename, err));
}

module.exports = saveFile;
