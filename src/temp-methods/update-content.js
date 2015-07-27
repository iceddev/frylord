'use strict';

const path = require('path');

const when = require('when');

const { put, del } = require('../level');
const { readFile } = require('../methods');
const listDir = require('./list-dir');
const updateAction = require('../utils/update-action');
const refreshDirectoryAction = require('../utils/refresh-directory-action');

function updateTempfile(filepath, newContents){
  return put(filepath, newContents);
}

function removeTempfile(filepath){
  return del(filepath);
}

function compareContents(filepath, newContents, savedContents){
  if(newContents === savedContents){
    return removeTempfile(filepath);
  } else {
    return updateTempfile(filepath, newContents);
  }
}

function updateContents(action, state, next){
  const { cwd, filename } = state;
  const { content } = action.payload;
  const filepath = path.join(cwd, filename);

  return when.try(compareContents, filepath, content, readFile(filepath))
    .catch((err) => {
      console.log(err);
      return updateTempfile(filepath, content);
    })
    .yield({ content })
    .fold(updateAction, action)
    .then(next)
    .then(listDir)
    .then(refreshDirectoryAction)
    .then(next);
}

module.exports = updateContents;
