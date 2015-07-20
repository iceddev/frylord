'use strict';

const pipeline = require('when/pipeline');

const { SAVE_FILE } = require('../constants');
const { writeFile, listDirectory } = require('../methods');

function createAction(listing){
  return {
    type: SAVE_FILE,
    payload: {
      listing
    }
  };
}

function listDir(){
  return listDirectory('.');
}

function saveFile(filename, content){
  const seq = [
    writeFile,
    listDir,
    createAction
  ];

  return pipeline(seq, filename, content);
}

module.exports = saveFile;
