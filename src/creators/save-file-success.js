'use strict';

const { SAVE_FILE } = require('../constants');
const { SAVE_FILE_SUCCESS } = require('../status-constants');

function saveFileSuccess({ listing, filename, silent }){
  return {
    type: SAVE_FILE,
    payload: {
      status: SAVE_FILE_SUCCESS,
      notification: `'${filename}' saved successfully`,
      filename,
      listing,
      silent
    }
  };
}

module.exports = saveFileSuccess;
