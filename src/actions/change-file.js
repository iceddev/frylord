'use strict';

const when = require('when');

const { CHANGE_FILE, ERROR } = require('../constants');
const { CHANGE_FILE_SUCCESS, CHANGE_FILE_FAILURE } = require('../status-constants');
const { readFile } = require('../methods');

function createAction(filename, content){
  return {
    type: CHANGE_FILE,
    payload: {
      notification: `Changed file to '${filename}'`,
      status: CHANGE_FILE_SUCCESS,
      filename,
      content
    }
  };
}

function changeFile(filename){
  return when.try(createAction, filename, readFile(filename))
    .catch((err) => ({
      type: ERROR,
      payload: {
        notification: `Failed to change file to '${filename}'`,
        status: CHANGE_FILE_FAILURE,
        error: err
      }
    }));
}

module.exports = changeFile;
