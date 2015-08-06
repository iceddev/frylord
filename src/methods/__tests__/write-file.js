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
  const filepath = '/this/is/a/test.txt';
  const dir = path.dirname(filepath);
  const base = path.basename(filepath);
  const data = 'this is sample text';

  it('creates a file in a given directory provided in filepath', function(done){
    writeFile(filepath, data)
      .then(function(entryArr){
        expect(entryArr[1].fullPath).toEqual(dir);
      })
      .then(function(){
        init()
          .then(rm(filepath));
      })
      .then(() => done(), done);
  });

  it('creates a file with a name provided in filepath', function(done){
    writeFile(filepath, data)
      .then(function(entryArr){
        expect(entryArr[2][0].name).toEqual(base);
      })
      .then(function(){
        init()
          .then(rm(filepath));
      })
      .then(() => done(), done);
  });

  it('creates a file in the current directory when filepath argument has no slashes', function(done){
    const filepath = 'name-only.txt';
    init()
      .then(() => cd('/'))
      .then(() => writeFile(filepath, data))
      .then(function(entryArr){
        expect(entryArr[2][0].name).toEqual(filepath);
        expect(entryArr[1].fullPath).toEqual('/');
      })
      .then(function(){
        init()
          .then(rm(filepath));
      })
      .then(() => done(), done);
  });

  it('sets the mime type to "text/plain"', function(done){
    writeFile(filepath, data)
      .then(function(){
        return init()
          .then(() => open(filepath));
      })
      .then(function(file){
        expect(file.type).toEqual('text/plain');
      })
      .then(function(){
        init()
          .then(rm(filepath));
      })
      .then(() => done(), done);
  });

  it('sets the content of the file to the text argument', function(done){
    writeFile(filepath, data)
      .then(function(){
        return init()
          .then(() => open(filepath))
          .then((file) => readAsText(file));
      })
      .then(function(text){
        expect(text).toEqual(data);
      })
      .then(function(){
        init()
          .then(rm(filepath));
      })
      .then(() => done(), done);
  });
});
