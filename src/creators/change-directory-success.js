'use strict';

const { CHANGE_DIRECTORY } = require('../constants');
const { CHANGE_DIRECTORY_SUCCESS } = require('../status-constants');

function changeDirectorySuccess({ cwd, listing, projects }){
  return {
    type: CHANGE_DIRECTORY,
    payload: {
      notification: `Changed directory to '${cwd}'`,
      status: CHANGE_DIRECTORY_SUCCESS,
      cwd,
      listing,
      projects
    }
  };
}

module.exports = changeDirectorySuccess;
