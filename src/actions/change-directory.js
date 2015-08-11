'use strict';

const keys = require('when/keys');
const pipeline = require('when/pipeline');

const { changeDirectorySuccess, changeDirectoryError } = require('../creators');
const { changeDir, listCwd, listProjects } = require('../methods');

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
  changeDirectorySuccess
];

function changeDirectory(dirpath){
  return pipeline(seq, dirpath)
    .catch((err) => changeDirectoryError(dirpath, err));
}

module.exports = changeDirectory;
