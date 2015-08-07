'use strict';

const _ = require('lodash');
const { map } = require('when');
const expect = require('expect');

const listDir = require('../list-dir');
const {
  init,
  ls,
  write,
  rm
} = require('../../filer');

const dirPath = '/';
const filenames = _.map(new Array(5), (val, idx) => {
  return `${dirPath}test${idx + 1}.txt`;
});

describe('listDir methods', function(){

  before(function(done){
    init()
      .then(() => ls(dirPath))
      .then((entries) => {
        _.forEach(entries, (entry) => {
          rm(entry.fullPath);
        });
      })
      .catch(console.log.bind(console, 'before of listDir:'))
      .finally(() => done());
  });

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
      .catch(console.log.bind(console, 'beforeEach of listDir:'))
      .finally(() => done());
  });

  afterEach(function(done){
    init()
      .then(() => ls(dirPath))
      .then((entries) => {
        _.forEach(entries, (entry) =>{
          rm(entry.fullPath);
        });
      })
      .catch(console.log.bind(console, 'afterEach of listDir:'))
      .finally(() => done());
  });

  it('lists all entries in argument specified directory', function(done){
    listDir(dirPath)
      .then(function(entries){
        expect(entries.length).toEqual(filenames.length);
      })
      .finally(() => done(), done);
  });
});
