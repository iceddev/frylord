'use strict';

const { CHANGE_FILE } = require('../constants');
const { CHANGE_FILE_SUCCESS } = require('../status-constants');

function changeFileSuccess(filename, content){
  return {
    type: CHANGE_FILE,
    payload: {
      notification: `Changed file to '${filename}'`,
      status: CHANGE_FILE_SUCCESS,
      filename,
      content
    }
  };
}

module.exports = changeFileSuccess;
