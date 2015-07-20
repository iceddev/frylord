'use strict';

const { UPDATE_FILENAME } = require('../constants');

function updateFilename(filename){
  return {
    type: UPDATE_FILENAME,
    payload: {
      filename
    }
  };
}

module.exports = updateFilename;
