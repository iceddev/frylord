'use strict';

const pipeline = require('when/pipeline');

const listDirectory = require('./list-directory');

const filer = require('../filer');

const opts = {
  persistent: true,
  size: 1024 * 1024
};

function createAction(payload){
  return {
    type: 'DELETE_FILE',
    payload
  };
}

function deleteFile(filename){
  const seq = [
    () => filer.init(opts),
    () => filer.rm(filename),
    () => listDirectory('.'),
    ({ payload }) => ({ listing: payload.listing })
  ];

  return pipeline(seq).then(createAction);
}

module.exports = deleteFile;
