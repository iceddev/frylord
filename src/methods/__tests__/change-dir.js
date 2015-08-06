'use strict';

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
  const path = '/test';
  const entry = 'testFile.txt';
  const opts = {
    data: 'This is sample text',
    type: 'text/plain'
  };

  beforeEach(function(done){
    init()
      .then(() => mkdir(path, false))
      .then(() => cd(path))
      .then(() => write(entry, opts))
      .then(() => cd(initPath))
      .then(() => done(), done);
  });

  afterEach(function(done){
    init()
      .then(() => rm(`${path}/${entry}`))
      .then(() => done(), done);
  });

  it('changes directory to the argument', function(done){
    changeDir(path)
      .then((fullPath) => {
        expect(fullPath).toEqual(path);
      }, done)
      .then(() => done(), done);
  });

  it.skip('throws an error directory argument does not exist', function(done){
    done();
  });
});
