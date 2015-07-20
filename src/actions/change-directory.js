'use strict';

const keys = require('when/keys');
const pipeline = require('when/pipeline');

const { CHANGE_DIRECTORY, ERROR } = require('../constants');
const { CHANGE_DIRECTORY_SUCCESS, CHANGE_DIRECTORY_FAILURE } = require('../status-constants');
const { changeDir, listCwd, listProjects } = require('../methods');

function createAction({ cwd, listing, projects }){
  return {
    type: CHANGE_DIRECTORY,
    payload: {
      notification: `Changed directory to '${cwd}'`,
      status: CHANGE_DIRECTORY_SUCCESS,
      cwd,
      listing,
      projects
    }
  };
}

function getData(cwd){
  return keys.all({
    cwd,
    listing: listCwd(),
    projects: listProjects()
  });
}

const seq = [
  changeDir,
  getData,
  createAction
];

function changeDirectory(dirpath){
  return pipeline(seq, dirpath)
    .catch((err) => ({
      type: ERROR,
      payload: {
        notification: `Failed to change directory to '${dirpath}'`,
        status: CHANGE_DIRECTORY_FAILURE,
        error: err
      }
    }));
}

module.exports = changeDirectory;
