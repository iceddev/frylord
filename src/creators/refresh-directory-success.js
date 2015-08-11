'use strict';

const { REFRESH_DIRECTORY } = require('../constants');
const { REFRESH_DIRECTORY_SUCCESS } = require('../status-constants');

function refreshDirectorySuccess(listing){
  return {
    type: REFRESH_DIRECTORY,
    payload: {
      notification: `Current working directory updated'`,
      status: REFRESH_DIRECTORY_SUCCESS,
      listing
    }
  };
}

module.exports = refreshDirectorySuccess;
