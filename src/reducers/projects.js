'use strict';

const {
  DELETE_DIRECTORY,
  CHANGE_DIRECTORY
} = require('../constants');

const initial = [];

function projects(state = initial, { type, payload }){
  switch(type){
    case DELETE_DIRECTORY:
    case CHANGE_DIRECTORY:
      // TODO: need to attach projects to the payload of CHANGE_DIRECTORY
      return payload.projects || [];
    default:
      return state;
  }
}

module.exports = projects;
