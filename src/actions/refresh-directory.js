'use strict';

const pipeline = require('when/pipeline');

const { REFRESH_DIRECTORY, ERROR } = require('../constants');
const { REFRESH_DIRECTORY_SUCCESS, REFRESH_DIRECTORY_FAILURE } = require('../status-constants');
const { listCwd } = require('../methods');

function createAction(listing){
  return {
    type: REFRESH_DIRECTORY,
    payload: {
      notification: `Current working directory updated'`,
      status: REFRESH_DIRECTORY_SUCCESS,
      listing
    }
  };
}

const seq = [
  listCwd,
  createAction
];

function refreshDirectory(){
  return pipeline(seq)
    .catch((err) => ({
      type: ERROR,
      payload: {
        notification: `Failed to update current working directory`,
        status: REFRESH_DIRECTORY_FAILURE,
        error: err
      }
    }));
}

module.exports = refreshDirectory;
