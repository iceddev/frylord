'use strict';

const { NEW_FILE } = require('../constants');

function newFileSuccess(filename, content){
  return {
    type: NEW_FILE,
    payload: {
      filename,
      content,
      unsaved: true
    }
  };
}

module.exports = newFileSuccess;
