'use strict';

const pipeline = require('when/pipeline');

const readFile = require('./read-file');

function createAction(payload){
  return {
    type: 'CHANGE_FILE',
    payload
  };
}

function changeFile(filename){
  const seq = [
    () => readFile(filename),
    ({ payload }) => ({ filename, content: payload.content })
  ];

  return pipeline(seq).then(createAction);
}

module.exports = changeFile;
