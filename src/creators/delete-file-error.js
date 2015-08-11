'use strict';

const { ERROR } = require('../constants');
const { DELETE_FILE_FAILURE } = require('../status-constants');


function deleteFileError(filename, err){
  return {
    type: ERROR,
    payload: {
      notification: `Failed to delete '${filename}'`,
      status: DELETE_FILE_FAILURE,
      error: err
    }
  };
}

module.exports = deleteFileError;