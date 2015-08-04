'use strict';

const {
  updateContent,
  changeFile,
  saveFile,
  deleteFile,
  refreshDir
} = require('../temp-methods');

const {
  ERROR,
  UPDATE_CONTENT,
  NEW_FILE,
  SAVE_FILE,
  DELETE_FILE,
  CHANGE_FILE,
  CHANGE_DIRECTORY,
  REFRESH_DIRECTORY
} = require('../constants');

const {
  CHANGE_FILE_FAILURE
} = require('../status-constants');

function handleError(action, state, next){
  const { status, args } = action.payload;

  switch(status){
    case CHANGE_FILE_FAILURE:
      const newAction = {
        type: NEW_FILE,
        payload: {
          filename: args[0],
          unsaved: true
        }
      };
      // TODO: handle an error in this too
      // TODO: name this better
      return changeFile(newAction, state, next)
        .catch(() => next(action));
    default:
      return next(action);
  }
}

function tempMiddleware({ getState }){
  return (next) => (action) => {
    const { type } = action;
    const state = getState();

    switch(type){
      case UPDATE_CONTENT:
        return updateContent(action, state, next);
      case CHANGE_FILE:
        return changeFile(action, state, next)
          .catch(() => next(action));
      case SAVE_FILE:
        return saveFile(action, state, next);
      case DELETE_FILE:
        return deleteFile(action, state, next);
      // TODO: handle cleaning up temp files in deleted directory
      case CHANGE_DIRECTORY:
      case REFRESH_DIRECTORY:
        return refreshDir(action, state, next);
      case ERROR:
        return handleError(action, state, next);
      default:
        return next(action);
    }
  };
}

module.exports = tempMiddleware;
