'use strict';

const pipeline = require('when/pipeline');

const listDirectory = require('./list-directory');

function createAction(payload){
  return {
    type: 'CHANGE_DIRECTORY',
    payload
  };
}

function changeDirectory(dirname){
  const seq = [
    () => listDirectory(dirname),
    ({ payload }) => ({ cwd: dirname, listing: payload.listing })
  ];

  return pipeline(seq).then(createAction);
}

module.exports = changeDirectory;
