'use strict';

const { ERROR } = require('../constants');
const { DELETE_DIRECTORY_FAILURE } = require('../status-constants');

function deleteDirectoryError(dirpath, err){
  return {
    type: ERROR,
    payload: {
      notification: `Failed to delete '${dirpath}'`,
      status: DELETE_DIRECTORY_FAILURE,
      error: err
    }
  };
}

module.exports = deleteDirectoryError;