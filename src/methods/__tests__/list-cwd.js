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

  beforeEach(function(done){
    init()
      .then(() => mkdir(dirPath, false))
      .then(function(){
        const len = filenames.length;
        return map(filenames, (val, idx) => {
          let filepath = `${dirPath}/${val}`;
          return write(filepath, {
            data: `${idx + 1} of ${len}`,
            type: 'text/plain'
          });
        });
      })
      .then(() => done(), done);
  });

  afterEach(function(done){
    init()
      .then(() => rm(dirPath))
      .then(() => done(), done);
  });

  it('lists all entries in the current working directory', function(done){
    init()
      .then(() => cd(dirPath))
      .then(() => listCwd())
      .then(function(entries){
        expect(entries.length).toEqual(filenames.length);
      })
      .then(() => done(), done);
  });
});
