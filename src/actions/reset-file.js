'use strict';

const when = require('when');

const {
  RESET_FILE
} = require('../constants');

function createAction(){
  return {
    type: RESET_FILE,
    payload: {}
  };
}

function resetFile(){
  return when.resolve(createAction());
}

module.exports = resetFile;
