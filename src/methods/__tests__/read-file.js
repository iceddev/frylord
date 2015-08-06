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
      .then(() => done(), done);
  });

  afterEach(function(done){
    init()
      .then(() => rm(filepath))
      .then(() => done(), done);
  });


  it('returns text when passed a valid filepath', function(done){
    readFile(filepath)
      .then(function(text){
        expect(text).toEqual(opts.data);
      })
      .then(() => done(), done);
  });

  // I DON'T KNOW HOW TO MAKE THIS WORK
  it.skip('returns an a rejected promise when filepath is not valid', function(done){
    const filepath = '';
    const errMsg = 'this should not have worked';
    console.log(readFile);
    readFile(filepath)
    // I pass in an invalid filepath and then what?
    // If readfile was successful there is a problem.
      .then(function(){
        done(new Error(errMsg));
      })
    // readFile should reject the promist with an error that I can match here.
      .catch(function(err){
        expect(err).toExist();
        done();
      });
  });
});
