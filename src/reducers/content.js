'use strict';

const {
  NEW_FILE,
  CHANGE_FILE,
  UPDATE_CONTENT
} = require('../constants');

const initial = '';

function content(state = initial, { type, payload }){
  switch(type){
    case NEW_FILE:
    case CHANGE_FILE:
    case UPDATE_CONTENT:
      return payload.content;
    default:
      return state;
  }
}

module.exports = content;
