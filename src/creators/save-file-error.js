'use strict';

const { ERROR } = require('../constants');
const { SAVE_FILE_FAILURE } = require('../status-constants');

function saveFileError(filename, err){
  return {
    type: ERROR,
    payload: {
      notification: `Failed to save '${filename}'`,
      status: SAVE_FILE_FAILURE,
      error: err
    }
  };
}

module.exports = saveFileError;
