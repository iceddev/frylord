'use strict';

const initial = '/';

function cwd(state = initial, { type, payload = {} }){
  switch(type){
    case 'CHANGE_DIRECTORY':
      return payload.cwd;
    default:
      return state;
  }
}

module.exports = cwd;
