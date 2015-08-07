'use strict';

const {
  ERROR,
  SAVE_FILE,
  DELETE_FILE,
  CHANGE_FILE,
  DELETE_DIRECTORY,
  CHANGE_DIRECTORY
} = require('../constants');

const initial = '';

function notification(state = initial, { type, payload }){
  switch(type){
    case ERROR:
    case SAVE_FILE:
    case DELETE_FILE:
    case CHANGE_FILE:
    case DELETE_DIRECTORY:
    case CHANGE_DIRECTORY:
      return payload.notification || initial;
    default:
      // Returning initial here to reset a notification on non-explicitlly handled actions
      return initial;
  }
}

module.exports = notification;
