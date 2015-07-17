'use strict';

const when = require('when');
const pipeline = require('when/pipeline');

const filer = require('../filer');

const opts = {
  persistent: true,
  size: 1024 * 1024
};

function createAction(content){
  return {
    type: 'READ_FILE',
    payload: { content }
  };
}

function read(file){
  return when.promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (evt) => resolve(evt.target.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function readFile(filename){
  const seq = [
    () => filer.init(opts),
    () => filer.open(filename),
    (file) => read(file)
  ];

  return pipeline(seq).then(createAction);
}

module.exports = readFile;
