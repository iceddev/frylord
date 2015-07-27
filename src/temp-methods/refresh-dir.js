'use strict';

const listDir = require('./list-dir');
const updateAction = require('../utils/update-action');

function refreshDir(action, state, next){
  return listDir()
    .fold(updateAction, action)
    .then(next);
}

module.exports = refreshDir;
