'use strict';

const path = require('path');

const { get } = require('../level');
const updateAction = require('../utils/update-action');

function changeFile(action, state, next){
  const { cwd } = state;
  const { filename } = action.payload;
  const filepath = path.join(cwd, filename);

  return get(filepath)
    .then((content) => ({ content }))
    .fold(updateAction, action)
    .then(next);
}

module.exports = changeFile;
