'use strict';

const _ = require('lodash');
const { map } = require('when');
const expect = require('expect');

const listRoot = require('../list-root');
const {
  init,
  ls,
  write,
  rm
} = require('../../filer');

const dirPath = '/';
const filenames = _.map(new Array(5), (val, idx) => {
  return `test${idx + 1}`;
});

describe('listRoot methods', function(){

  beforeEach(function(done){
    init()
      .then(function(){
        const len = filenames.length;
        return map(filenames, (val, idx) => {
          return write(val, {
            data: `${idx + 1} of ${len}`,
            type: 'text/plain'
          });
        });
      })
      .then(() => done(), done);
  });

  afterEach(function(done){
    init()
      .then(() => ls(dirPath))
      .then((entries) => map(entries, (entry) => rm(entry.fullPath)))
      .then(() => done(), done);
  });

  it('lists all entries in the root directory', function(done){
    listRoot()
      .then(function(entries){
        expect(entries.length).toEqual(filenames.length);
      })
      .then(() => done(), done);
  });
});