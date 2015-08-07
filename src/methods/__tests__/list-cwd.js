'use strict';

const _ = require('lodash');
const { map } = require('when');
const expect = require('expect');

const listCwd = require('../list-cwd');
const {
  init,
  cd,
  ls,
  mkdir,
  write,
  rm
} = require('../../filer');

const dirPath = '/cwd';
const filenames = _.map(new Array(3), (val, idx) => {
  return `test${idx + 1}.txt`;
});

describe('listCwd methods', function(){

  before(function(done){
    init()
      .then(() => mkdir(dirPath, false))
      .then(() => ls(dirPath))
      .then((entries) => {
        _.forEach(entries, (entry) =>{
          rm(entry.fullPath);
        });
      })
      .catch(console.log.bind(console, 'before of listCwd:'))
      .finally(() => done(), done);
  });

  beforeEach(function(done){
    init()
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
      .catch(console.log.bind(console, 'beforeEach of listCwd:'))
      .finally(() => done());
  });

  afterEach(function(done){
    init()
      .then(() => rm(dirPath))
      .catch(console.log.bind(console, 'afterEach of listCwd:'))
      .finally(() => done());
  });

  it('lists all entries in the current working directory', function(done){
    init()
      .then(() => cd(dirPath))
      .then(() => listCwd())
      .then(function(entries){
        expect(entries.length).toEqual(filenames.length);
      })
      .finally(() => done(), done);
  });
});
