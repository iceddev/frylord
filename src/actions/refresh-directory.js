'use strict';

const pipeline = require('when/pipeline');

const { refreshDirectorySuccess, refreshDirectoryError } = require('../creators');
const { listCwd } = require('../methods');

const seq = [
  listCwd,
  refreshDirectorySuccess
];

function refreshDirectory(){
  return pipeline(seq)
    .catch(refreshDirectoryError);
}

module.exports = refreshDirectory;
