'use strict';

const when = require('when');

const { updateContentSuccess } = require('../creators');

function updateContent(content){
  return when.resolve(updateContentSuccess(content));
}

module.exports = updateContent;
