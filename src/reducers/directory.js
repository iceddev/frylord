'use strict';

const {
  SAVE_FILE,
  DELETE_FILE,
  CHANGE_DIRECTORY,
  REFRESH_DIRECTORY
} = require('../constants');

const initial = [];

function directory(state = initial, { type, payload }){
  switch(type){
    case SAVE_FILE:
    case DELETE_FILE:
    case CHANGE_DIRECTORY:
    case REFRESH_DIRECTORY:
      return payload.listing;
    default:
      return state;
  }
}

module.exports = directory;
