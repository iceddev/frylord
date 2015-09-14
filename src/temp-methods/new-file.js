'use strict';

const path = require('path');

const { put } = require('../level');

function newFile(action, state, next){
  const { cwd } = state;
  const { filename, content } = action.payload;

  const filepath = path.join(cwd, filename);

  return put(filepath, content)
    .yield(action)
    .then(next);
}

module.exports = newFile;
