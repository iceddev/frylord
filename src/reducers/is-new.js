'use strict';

const {
  NEW_FILE,
  SAVE_FILE,
  CHANGE_FILE
} = require('../constants');

const initial = false;

function isNew(state = initial, { type }){
  switch(type){
    // TODO: what if we change the filename?
    case NEW_FILE:
      return true;
    // TODO: what if we delete the file?
    case SAVE_FILE:
    case CHANGE_FILE:
      return false;
    default:
      return state;
  }
}

module.exports = isNew;
