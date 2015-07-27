'use strict';

const path = require('path');

const { del } = require('../level');
const listDir = require('./list-dir');
const updateAction = require('../utils/update-action');

function saveFile(action, state, next){
  const { cwd } = state;
  const { filename } = action.payload;
  const filepath = path.join(cwd, filename);

  return del(filepath)
    .then(listDir)
    .fold(updateAction, action)
    .then(next);
}

module.exports = saveFile;
