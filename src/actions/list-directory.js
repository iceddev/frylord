'use strict';

const pipeline = require('when/pipeline');

const filer = require('../filer');

const opts = {
  persistent: true,
  size: 1024 * 1024
};

function createAction(listing){
  return {
    type: 'LIST_DIRECTORY',
    payload: {
      listing
    }
  };
}

function listDirectory(dirname){
  const seq = [
    () => filer.init(opts),
    () => filer.ls(dirname),
    (entries) => entries.map((entry) => entry.name)
  ];

  return pipeline(seq).then(createAction);
}

module.exports = listDirectory;
