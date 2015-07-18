'use strict';

const pipeline = require('when/pipeline');

const listDirectory = require('./list-directory');

const filer = require('../filer');

const opts = {
  persistent: true,
  size: 1024 * 1024
};

function createAction({ listing }){
  return {
    type: 'CHANGE_DIRECTORY',
    payload: {
      cwd: filer.cwd.fullPath,
      listing
    }
  };
}

function changeDirectory(dirname){
  const seq = [
    () => filer.init(opts),
    () => filer.cd(dirname),
    () => listDirectory('.'),
    ({ payload }) => ({ listing: payload.listing })
  ];

  return pipeline(seq).then(createAction);
}

module.exports = changeDirectory;
