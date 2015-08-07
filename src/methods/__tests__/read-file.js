'use strict';

const expect = require('expect');

const { init, write, rm } = require('../../filer');
const readFile = require('../read-file');

describe('readFile methods', function(){
  const filepath = 'test.txt';
  const opts = {
    data: 'this is sample text',
    type: 'text/plain'
  };

  beforeEach(function(done){
    init()
      .then(() => write(filepath, opts))
      .catch(console.log.bind(console, 'beforeEach of readFile: '))
      .finally(() => done());
  });

  afterEach(function(done){
    init()
      .then(() => rm(filepath))
      .catch(console.log.bind(console, 'afterEach of readFile: '))
      .finally(() => done());
  });

  it('returns text when passed a valid filepath', function(done){
    readFile(filepath)
      .then(function(text){
        expect(text).toEqual(opts.data);
      })
      .finally(() => done(), done);
  });

  it('returns an a rejected promise when filepath is not valid', function(done){
    readFile('doesNotExist.txt')
      .catch((err) => {
        expect(err.message).toContain('could not be found');
      })
      .finally(() => done());
  });
});
