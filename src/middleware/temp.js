'use strict';

const path = require('path');

const _ = require('lodash');
const when = require('when');

const { readFile, listCwd } = require('../methods');

const { get, put, del, notFound } = require('../utils/temp');

const {
  UPDATE_CONTENT,
  CHANGE_FILE,
  CHANGE_DIRECTORY,
  REFRESH_DIRECTORY
} = require('../constants');

function updateTemp(filepath, content){
  return readFile(filepath)
    .then(function(fileContents){
      if(content === fileContents){
        return del(filepath);
      } else {
        return put(filepath, content);
      }
    })
    .otherwise(function(){
      return put(filepath, content);
    })
    .yield({ content });
}

function tempMapper(entry){
  return get(entry.fullPath)
    .then(() => _.assign({ temp: true }, entry))
    .catch(notFound, () => _.assign({ temp: false }, entry));
}

function listDirTemp(){
  return when.map(listCwd(), tempMapper)
    .then((listing) => ({ listing }));
}

function refreshDirectoryAction({ listing }){
  return {
    type: REFRESH_DIRECTORY,
    payload: {
      listing
    }
  };
}

function updateAction({ type, payload }, payloadUpdate){
  return {
    type,
    payload: _.assign({}, payload, payloadUpdate)
  };
}

function tempMiddleware({ getState }){
  return (next) => (action) => {
    const { type, payload } = action;
    const { cwd, filename } = getState();
    const filepath = path.join(cwd, filename);

    switch(type){
      case UPDATE_CONTENT:
        return updateTemp(filepath, payload.content)
          .fold(updateAction, action)
          .then(next)
          .then(listDirTemp)
          .then(refreshDirectoryAction)
          .then(next);
      case CHANGE_FILE:
        return get(path.join(cwd, payload.filename))
          .then((content) => ({ content }))
          .fold(updateAction, action)
          .then(next)
          .catch(notFound, () => next(action));
      case CHANGE_DIRECTORY:
        return listDirTemp()
          .fold(updateAction, action)
          .then(next);
      case REFRESH_DIRECTORY:
        return listDirTemp()
          .fold(updateAction, action)
          .then(next);
      default:
        return next(action);
    }
  };
}

module.exports = tempMiddleware;
