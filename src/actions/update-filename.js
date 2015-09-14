'use strict';

const when = require('when');

const { updateFilenameSuccess } = require('../creators');

function updateFilename(filename){
  return when.resolve(updateFilenameSuccess(filename));
}

module.exports = updateFilename;
