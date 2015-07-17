'use strict';

const initial = {
  filename: ''
};

function file(state = initial, { type, payload = {} }){
  const { filename, content } = payload;

  switch(type){
    case 'CHANGE_FILE':
      return {
        filename,
        content
      };
    default:
      return state;
  }
}

module.exports = file;
