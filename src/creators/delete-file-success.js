'use strict';

const { DELETE_FILE } = require('../constants');
const { DELETE_FILE_SUCCESS } = require('../status-constants');

function deleteFileSuccess({ listing, filename }){
  return {
    type: DELETE_FILE,
    payload: {
      notification: `'${filename}' deleted successfully`,
      status: DELETE_FILE_SUCCESS,
      listing,
      filename
    }
  };
}

module.exports = deleteFileSuccess;
