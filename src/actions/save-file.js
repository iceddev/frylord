'use strict';

const keys = require('when/keys');
const pipeline = require('when/pipeline');

const { SAVE_FILE, ERROR } = require('../constants');
const { SAVE_FILE_SUCCESS, SAVE_FILE_FAILURE } = require('../status-constants');
const { writeFile, listCwd } = require('../methods');

function createAction({ listing, filename }){
  return {
    type: SAVE_FILE,
    payload: {
      notification: `'${filename}' saved successfully`,
      status: SAVE_FILE_SUCCESS,
      filename,
      listing
    }
  };
}

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
  createAction
];

function saveFile(filename, content){
  return pipeline(seq, filename, content)
    .catch((err) => ({
      type: ERROR,
      payload: {
        notification: `Failed to save '${filename}'`,
        status: SAVE_FILE_FAILURE,
        error: err
      }
    }));
}

module.exports = saveFile;
