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

  beforeEach(function(){
    return init()
      .then(() => mkdir(path))
      .then(() => write(entry, opts))
      .then(() => cd(initPath));
  });

  afterEach(function(){
    return init()
      .then(() => cd(initPath))
      .then(() => rm(path))
      .then(function(){
        if(notExistPath){
          return rm(notExistPath);
        }
      });
  });

  afterEach(function(done){
    notExistPath = null;
    done();
  });

  it('changes directory to the argument if it exists', function(){
    return changeDir(path)
      .then((fullPath) => {
        expect(fullPath).toEqual(path);
      });
  });

  it('throws an error if directory argument does not exist', function(){
    notExistPath = '/doesNotExist';
    return changeDir(notExistPath)
      .catch((err) => {
        expect(err.message).toContain('could not be found');
      });
  });
});
