'use strict';

const keys = require('when/keys');
const pipeline = require('when/pipeline');

const { CHANGE_DIRECTORY } = require('../constants');
const { changeDir, listCwd, listProjects } = require('../methods');

function createAction({ cwd, listing, projects }){
  return {
    type: CHANGE_DIRECTORY,
    payload: {
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
  return pipeline(seq, dirpath);
}

module.exports = changeDirectory;
