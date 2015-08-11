'use strict';

const { ERROR } = require('../constants');
const { CHANGE_FILE_FAILURE } = require('../status-constants');

function changeFileError(filename, err){
  return {
    type: ERROR,
    payload: {
      notification: `Failed to change file to '${filename}'`,
      status: CHANGE_FILE_FAILURE,
      error: err,
      args: arguments
    }
  };
}

module.exports = changeFileError;
