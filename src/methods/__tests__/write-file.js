'use strict';

const path = require('path');

const expect = require('expect');

const writeFile = require('../write-file');
const readAsText = require('../../utils/read-as-text');
const {
  init,
  cd,
  open,
  rm
} = require('../../filer');

describe('writeFile methods', function(){
  let filepath = '/this/is/a/test.txt';
  let dir = path.dirname(filepath);
  const base = path.basename(filepath);
  const data = 'this is sample text';

  beforeEach(function(done){
    filepath = '/this/is/a/test.txt';
    dir = path.dirname(filepath);
    done();
  });

  afterEach(function(done){
    if (dir === path.dirname(filepath)){
      dir = '/this';
    } else {
      dir = filepath;
    }
    init()
      .then(() => rm(dir))
      .then(() => done(), done);
  });

  it('creates a file in a given directory provided in filepath', function(done){
    writeFile(filepath, data)
      .then(function(entryArr){
        expect(entryArr[1].fullPath).toEqual(dir);
      })
      .then(() => done(), done);
  });

  it('creates a file with a name provided in filepath', function(done){
    writeFile(filepath, data)
      .then(function(entryArr){
        expect(entryArr[2][0].name).toEqual(base);
      })
      .then(() => done(), done);
  });

  it('creates a file in the current directory when filepath argument has no slashes', function(done){
    filepath = 'name-only.txt';
    dir = '/';
    init()
      .then(() => cd(dir))
      .then(() => writeFile(filepath, data))
      .then(function(entryArr){
        expect(entryArr[2][0].name).toEqual(filepath);
        expect(entryArr[1].fullPath).toEqual('/');
      })
      .then(() => done(), done);
  });

  it('sets the mime type to "text/plain"', function(done){
    writeFile(filepath, data)
      .then(() => open(filepath))
      .then(function(file){
        expect(file.type).toEqual('text/plain');
      })
      .then(() => done(), done);
  });

  it('sets the content of the file to the text argument', function(done){
    writeFile(filepath, data)
      .then(() => open(filepath))
      .then((file) => readAsText(file))
      .then(function(text){
        expect(text).toEqual(data);
      })
      .then(() => done(), done);
  });
});
