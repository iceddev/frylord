'use strict';

const when = require('when');

const { UPDATE_CONTENT } = require('../constants');

function createAction(content){
  return {
    type: UPDATE_CONTENT,
    payload: {
      content
    }
  };
}

function updateContent(content){
  return when.resolve(createAction(content));
}

module.exports = updateContent;
