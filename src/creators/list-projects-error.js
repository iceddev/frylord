'use strict';

const { ERROR } = require('../constants');
const { REFRESH_DIRECTORY_FAILURE } = require('../status-constants');

function listProjectsError(err){
  return {
    type: ERROR,
    payload: {
      notification: 'Failed to refresh project list',
      status: REFRESH_DIRECTORY_FAILURE,
      error: err
    }
  };
}

module.exports = listProjectsError;
