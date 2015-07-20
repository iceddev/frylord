'use strict';

const pipeline = require('when/pipeline');

const { DELETE_FILE } = require('../constants');
const { removeFile, listCwd } = require('../methods');

function createAction(listing){
  return {
    type: DELETE_FILE,
    payload: {
      listing
    }
  };
}

const seq = [
  removeFile,
  listCwd,
  createAction
];

function deleteFile(filepath){
  return pipeline(seq, filepath);
}

module.exports = deleteFile;
