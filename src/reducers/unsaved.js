'use strict';

const {
  NEW_FILE,
  SAVE_FILE,
  CHANGE_FILE,
  UPDATE_CONTENT
} = require('../constants');

const initial = false;

function unsaved(state = initial, { type, payload }){
  switch(type){
    // TODO: what if we change the filename?
    case NEW_FILE:
    case UPDATE_CONTENT:
      return payload.unsaved;
    // TODO: what if we delete the file?
    case SAVE_FILE:
    case CHANGE_FILE:
      // changing or saving the file means it is saved
      return initial;
    default:
      return state;
  }
}

module.exports = unsaved;
