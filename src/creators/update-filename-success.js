'use strict';

const { UPDATE_FILENAME } = require('../constants');

function updateFilenameSuccess(filename){
  return {
    type: UPDATE_FILENAME,
    payload: {
      filename
    }
  };
}

module.exports = updateFilenameSuccess;
