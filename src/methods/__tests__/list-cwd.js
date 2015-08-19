'use strict';

const _ = require('lodash');
const { map } = require('when');
const expect = require('expect');

const listCwd = require('../list-cwd');
const {
  init,
  cd,
  mkdir,
  write,
  rm
} = require('../../filer');

const dirPath = '/cwd';
const filenames = _.map(new Array(3), (val, idx) => {
  return `test${idx + 1}.txt`;
});

describe('listCwd methods', function(){

  beforeEach(function(){
    return init()
      .then(() => mkdir(dirPath))
      .then(function(){
        const len = filenames.length;
        return map(filenames, (val, idx) => {
          const filepath = `${dirPath}/${val}`;
          return write(filepath, {
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

  it('lists all entries in the current working directory', function(){
    return init()
      .then(() => cd(dirPath))
      .then(() => listCwd())
      .then(function(entries){
        expect(entries.length).toEqual(filenames.length);
      });
  });
});
