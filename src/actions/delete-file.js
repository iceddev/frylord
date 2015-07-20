'use strict';

const keys = require('when/keys');
const pipeline = require('when/pipeline');

const { DELETE_FILE, ERROR } = require('../constants');
const { DELETE_FILE_SUCCESS, DELETE_FILE_FAILURE } = require('../status-constants');
const { removeFile, listCwd } = require('../methods');

function createAction({ listing, filename }){
  return {
    type: DELETE_FILE,
    payload: {
      notification: `'${filename}' deleted successfully`,
      status: DELETE_FILE_SUCCESS,
      listing
    }
  };
}

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
  createAction
];

function deleteFile(filename){
  return pipeline(seq, filename)
    .catch((err) => ({
      type: ERROR,
      payload: {
        notification: `Failed to delete '${filename}'`,
        status: DELETE_FILE_FAILURE,
        error: err
      }
    }));
}

module.exports = deleteFile;
