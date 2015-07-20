'use strict';

const when = require('when');

const { CHANGE_FILE } = require('../constants');
const { readFile } = require('../methods');

function createAction(filename, content){
  return {
    type: CHANGE_FILE,
    payload: {
      filename,
      content
    }
  };
}

function changeFile(filename){
  return when.try(createAction, filename, readFile(filename));
}

module.exports = changeFile;
