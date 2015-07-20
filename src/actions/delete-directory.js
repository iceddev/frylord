'use strict';

const keys = require('when/keys');
const pipeline = require('when/pipeline');

const { DELETE_DIRECTORY, ERROR } = require('../constants');
const { DELETE_DIRECTORY_SUCCESS, DELETE_DIRECTORY_FAILURE } = require('../status-constants');
const { removeDir, listCwd, listProjects } = require('../methods');

function createAction({ listing, projects, dirpath }){
  return {
    type: DELETE_DIRECTORY,
    payload: {
      notification: `'${dirpath}' deleted successfully`,
      status: DELETE_DIRECTORY_SUCCESS,
      listing,
      projects
    }
  };
}

function remove(dirpath){
  return removeDir(dirpath).yield(dirpath);
}

function getData(dirpath){
  return keys.all({
    dirpath,
    listing: listCwd(),
    projects: listProjects()
  });
}

const seq = [
  remove,
  getData,
  createAction
];

function deleteDirectory(dirpath){
  return pipeline(seq, dirpath)
    .catch((err) => ({
      type: ERROR,
      payload: {
        notification: `Failed to delete '${dirpath}'`,
        status: DELETE_DIRECTORY_FAILURE,
        error: err
      }
    }));
}

module.exports = deleteDirectory;
