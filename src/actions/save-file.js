'use strict';

const pipeline = require('when/pipeline');

const { SAVE_FILE } = require('../constants');
const { writeFile, listCwd } = require('../methods');

function createAction(listing){
  return {
    type: SAVE_FILE,
    payload: {
      listing
    }
  };
}

const seq = [
  writeFile,
  listCwd,
  createAction
];

function saveFile(filename, content){
  return pipeline(seq, filename, content);
}

module.exports = saveFile;
