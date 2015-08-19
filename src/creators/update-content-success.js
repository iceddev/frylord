'use strict';

const { UPDATE_CONTENT } = require('../constants');

function updateContentSuccess(content){
  return {
    type: UPDATE_CONTENT,
    payload: {
      content,
      unsaved: true
    }
  };
}

module.exports = updateContentSuccess;
