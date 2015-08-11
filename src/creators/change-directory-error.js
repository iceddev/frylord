'use strict';

const { ERROR } = require('../constants');
const { CHANGE_DIRECTORY_FAILURE } = require('../status-constants');

function changeDirectoryError(dirpath, err){
  return {
    type: ERROR,
    payload: {
      notification: `Failed to change directory to '${dirpath}'`,
      status: CHANGE_DIRECTORY_FAILURE,
      error: err
    }
  };
}

module.exports = changeDirectoryError;