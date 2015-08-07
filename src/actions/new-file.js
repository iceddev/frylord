'use strict';

const when = require('when');

const { NEW_FILE } = require('../constants');

function createAction(filename, content){
  return {
    type: NEW_FILE,
    payload: {
      filename,
      content,
      unsaved: true
    }
  };
}

function newFile(filename, content){
  return when.resolve(createAction(filename, content));
}

module.exports = newFile;
