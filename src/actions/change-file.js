'use strict';

const when = require('when');

const { changeFileSuccess, changeFileError } = require('../creators');
const { readFile } = require('../methods');

function changeFile(filename){
  return when.try(changeFileSuccess, filename, readFile(filename))
    .catch((err) => changeFileError(filename, err));
}

module.exports = changeFile;
