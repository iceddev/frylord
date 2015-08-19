'use strict';

const when = require('when');

const { resetFileSuccess } = require('../creators');

function resetFile(){
  return when.resolve(resetFileSuccess());
}

module.exports = resetFile;
