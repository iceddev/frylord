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

  beforeEach(function(){
    return init()
      .then(() => write(filepath, opts));
  });

  afterEach(function(){
    return init()
      .then(() => rm(filepath));
  });

  it('returns text when passed a valid filepath', function(){
    return readFile(filepath)
      .then(function(text){
        expect(text).toEqual(opts.data);
      });
  });

  it('returns an a rejected promise when filepath is not valid', function(){
    return readFile('doesNotExist.txt')
      .catch((err) => {
        expect(err.message).toContain('could not be found');
      });
  });
});
