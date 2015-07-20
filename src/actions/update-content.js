'use strict';

const { UPDATE_CONTENT } = require('../constants');

function updateContent(content){
  return {
    type: UPDATE_CONTENT,
    payload: {
      content
    }
  };
}

module.exports = updateContent;
