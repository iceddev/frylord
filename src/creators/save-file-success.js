'use strict';

const { SAVE_FILE } = require('../constants');
const { SAVE_FILE_SUCCESS } = require('../status-constants');

function saveFileSuccess({ listing, filename }){
  return {
    type: SAVE_FILE,
    payload: {
      notification: `'${filename}' saved successfully`,
      status: SAVE_FILE_SUCCESS,
      filename,
      listing
    }
  };
}

module.exports = saveFileSuccess;
