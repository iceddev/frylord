'use strict';

const keys = require('when/keys');
const pipeline = require('when/pipeline');

const { deleteFileSuccess, deleteFileError } = require('../creators');
const { removeFile, listCwd } = require('../methods');

function remove(filename){
  return removeFile(filename).yield(filename);
}

function getData(filename){
  return keys.all({
    filename,
    listing: listCwd()
  });
}

const seq = [
  remove,
  getData,
  deleteFileSuccess
];

function deleteFile(filename){
  return pipeline(seq, filename)
    .catch((err) => deleteFileError(filename, err));
}

module.exports = deleteFile;
