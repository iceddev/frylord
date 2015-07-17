'use strict';

const initial = [];

function directory(state = initial, { type, payload }){
  switch(type){
    case 'CHANGE_DIRECTORY':
      return payload.listing;
    default:
      return state;
  }
}

module.exports = directory;
