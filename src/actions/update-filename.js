'use strict';

const when = require('when');

const { UPDATE_FILENAME } = require('../constants');

function createAction(filename){
  return {
    type: UPDATE_FILENAME,
    payload: {
      filename
    }
  };
}

function updateFilename(filename){
  return when.resolve(createAction(filename));
}

module.exports = updateFilename;
