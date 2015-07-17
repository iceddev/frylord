'use strict';

const path = require('path');

const pipeline = require('when/pipeline');

const filer = require('../filer');

const opts = {
  persistent: true,
  size: 1024 * 1024
};

function createAction(){
  return {
    type: 'WRITE_FILE',
    payload: {}
  };
}

function writeFile(filename, text){
  const dirname = path.dirname(filename);

  const seq = [
    () => filer.init(opts),
    () => filer.mkdir(dirname, false),
    () => filer.write(filename, { data: text, type: 'text/plain' })
  ];

  return pipeline(seq).then(createAction);
}

module.exports = writeFile;
