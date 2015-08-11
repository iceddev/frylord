'use strict';

const when = require('when');

const { updateFilenameSuccess } = require('update-filename-success');

function updateFilename(filename){
  return when.resolve(updateFilenameSuccess(filename));
}

module.exports = updateFilename;
