'use strict';

const { REFRESH_DIRECTORY } = require('../constants');

function refreshDirectoryAction({ listing }){
  return {
    type: REFRESH_DIRECTORY,
    payload: {
      listing
    }
  };
}

module.exports = refreshDirectoryAction;
