'use strict';

const _ = require('lodash');
const { map } = require('when');
const expect = require('expect');

const listDir = require('../list-dir');
const {
  init,
  mkdir,
  write,
  rm
} = require('../../filer');

const dirPath = '/listing';
const filenames = _.map(new Array(5), (val, idx) => {
  return `test${idx + 1}.txt`;
});

describe('listDir methods', function(){

  beforeEach(function(){
    return init()
      .then(() => mkdir(dirPath))
      .then(function(){
        const len = filenames.length;
        return map(filenames, (val, idx) => {
          return write(`${dirPath}/${val}`, {
            data: `${idx + 1} of ${len}`,
            type: 'text/plain'
          });
        });
      });
  });

  afterEach(function(){
    return init()
      .then(() => rm(dirPath));
  });

  it('lists all entries in argument specified directory', function(){
    return listDir(dirPath)
      .then(function(entries){
        expect(entries.length).toEqual(filenames.length);
      });
  });
});
