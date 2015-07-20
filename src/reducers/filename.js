'use strict';

const {
  CHANGE_FILE,
  UPDATE_FILENAME
} = require('../constants');

const initial = '';

function filename(state = initial, { type, payload }){
  switch(type){
    case CHANGE_FILE:
    case UPDATE_FILENAME:
      return payload.filename;
    default:
      return state;
  }
}

module.exports = filename;
