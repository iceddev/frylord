'use strict';

const keys = require('when/keys');
const pipeline = require('when/pipeline');

const { deleteDirectorySuccess, deleteDirectoryError } = require('../creators');
const { removeDir, listCwd, listProjects } = require('../methods');

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
  deleteDirectorySuccess
];

function deleteDirectory(dirpath){
  return pipeline(seq, dirpath)
    .catch((err) => deleteDirectoryError(dirpath, err));
}

module.exports = deleteDirectory;
