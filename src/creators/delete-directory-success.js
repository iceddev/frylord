'use strict';

const { DELETE_DIRECTORY } = require('../constants');
const { DELETE_DIRECTORY_SUCCESS } = require('../status-constants');

function deleteDirectorySuccess({ listing, projects, dirpath }){
  return {
    type: DELETE_DIRECTORY,
    payload: {
      notification: `'${dirpath}' deleted successfully`,
      status: DELETE_DIRECTORY_SUCCESS,
      listing,
      projects
    }
  };
}

module.exports = deleteDirectorySuccess;