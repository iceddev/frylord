'use strict';

const initial = {
  filename: '',
  content: ''
};

function file(state = initial, { type, payload }){
  switch(type){
    case 'CHANGE_FILE':
      return {
        filename: payload.filename,
        content: payload.content
      };
    default:
      return state;
  }
}

module.exports = file;
