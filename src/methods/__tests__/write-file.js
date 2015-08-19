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

  afterEach(function(){
    if (dir === path.dirname(filepath)){
      dir = '/this';
    } else {
      dir = filepath;
    }
    return init()
      .then(() => rm(dir));
  });

  it('creates a file in a given directory provided in filepath', function(){
    return writeFile(filepath, data)
      .then(function(entryArr){
        expect(entryArr[1].fullPath).toEqual(dir);
      });
  });

  it('creates a file with a name provided in filepath', function(){
    return writeFile(filepath, data)
      .then(function(entryArr){
        expect(entryArr[2][0].name).toEqual(base);
      });
  });

  it('creates a file in the current directory when filepath argument has no slashes', function(){
    filepath = 'name-only.txt';
    dir = '/';
    return init()
      .then(() => cd(dir))
      .then(() => writeFile(filepath, data))
      .then(function(entryArr){
        expect(entryArr[2][0].name).toEqual(filepath);
        expect(entryArr[1].fullPath).toEqual('/');
      });
  });

  it('sets the mime type to "text/plain"', function(){
    return writeFile(filepath, data)
      .then(() => open(filepath))
      .then(function(file){
        expect(file.type).toEqual('text/plain');
      });
  });

  it('sets the content of the file to the text argument', function(){
    return writeFile(filepath, data)
      .then(() => open(filepath))
      .then((file) => readAsText(file))
      .then(function(text){
        expect(text).toEqual(data);
      });
  });
});
