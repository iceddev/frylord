'use strict';

const _ = require('lodash');
const { map } = require('when');
const expect = require('expect');

const listRoot = require('../list-root');
const {
  init,
  cd,
  ls,
  write,
  rm
} = require('../../filer');

const dirPath = '/';
const filenames = _.map(new Array(5), (val, idx) => {
  return `test${idx + 1}`;
});

describe('listRoot methods', function(){
  let files = [];

  beforeEach(function(done){
    init()
      .then(function(){
        const len = filenames.length;
        return map(filenames, (val, idx) => {
          return write(`${dirPath}/${val}`, {
            data: `${idx + 1} of ${len}`,
            type: 'text/plain'
          });
        });
      })
      .then(function(){
        return ls(dirPath);
      })
      .then(function(createdEntries){
        files = createdEntries;
        return true;
      })
      .then(() => done(), done);
  });

  afterEach(function(done){
    init()
      .then(() => cd(dirPath))
      .then(function(){
        return map(filenames, (val) => {
          return rm(val);
        });
      })
      .then(function(){
        files = [];
      })
      .then(() => done(), done);
  });

  it('lists all entries in the root directory', function(done){
    listRoot()
      .then(function(entries){
        expect(entries.length).toEqual(files.length);
      })
      .then(() => done(), done);
  });
});
