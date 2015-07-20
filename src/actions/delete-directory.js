'use strict';

const keys = require('when/keys');
const pipeline = require('when/pipeline');

const { DELETE_DIRECTORY } = require('../constants');
const { removeDir, listCwd, listProjects } = require('../methods');

function createAction({ listing, projects }){
  return {
    type: DELETE_DIRECTORY,
    payload: {
      listing,
      projects
    }
  };
}

function getData(){
  return keys.all({
    listing: listCwd(),
    projects: listProjects()
  });
}

const seq = [
  removeDir,
  getData,
  createAction
];

function deleteDirectory(dirpath){
  return pipeline(seq, dirpath);
}

module.exports = deleteDirectory;
