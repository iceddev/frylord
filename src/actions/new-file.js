'use strict';

const when = require('when');

const { newFileSuccess } = require('../creators');

function newFile(filename, content){
  return when.resolve(newFileSuccess(filename, content));
}

module.exports = newFile;
