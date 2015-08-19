'use strict';

const { ERROR } = require('../constants');
const { REFRESH_DIRECTORY_FAILURE } = require('../status-constants');

function refreshDirectoryError(err){
  return {
    type: ERROR,
    payload: {
      notification: `Failed to update current working directory`,
      status: REFRESH_DIRECTORY_FAILURE,
      error: err
    }
  };
}

module.exports = refreshDirectoryError;
