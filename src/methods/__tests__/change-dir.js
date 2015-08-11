'use strict';

const { dirname } = require('path');
const expect = require('expect');

const changeDir = require('../change-dir');
const {
  init,
  mkdir,
  write,
  cd,
  rm
} = require('../../filer');

describe('changeDir methods', function(){
  const initPath = '/';
  const entry = '/test/testFile.txt';
  const path = dirname(entry);
  const opts = {
    data: 'This is sample text',
    type: 'text/plain'
  };
  let notExistPath;

  beforeEach(function(done){
    init()
      // get a `global leak detected: opt_errorcallback` error when false is omitted
      .then(() => mkdir(path))
      .then(() => write(entry, opts))
      .then(() => cd(initPath))
      .then(() => done(), done);
  });

  afterEach(function(done){
    init()
      .then(() => cd(initPath))
      .then(() => rm(path))
      .then(function(){
        if(notExistPath){
          return rm(notExistPath);
        }
      })
      .then(() => done(), done);
  });

  afterEach(function(done){
    notExistPath = null;
    done();
  });

  it('changes directory to the argument if it exists', function(done){
    changeDir(path)
      .then((fullPath) => {
        expect(fullPath).toEqual(path);
      })
      .then(() => done(), done);
  });

  it('throws an error if directory argument does not exist', function(done){
    notExistPath = '/doesNotExist';
    changeDir(notExistPath)
      .catch((err) => {
        expect(err.message).toContain('could not be found');
      })
      .then(() => done(), done);
  });
});
