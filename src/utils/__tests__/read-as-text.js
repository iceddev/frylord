'use strict';

const expect = require('expect');

const readAsText = require('../read-as-text');

describe('readAsText Util', function(){
  it('takes a Blob and returns text', function(done){
    const file = new Blob(['world']);
    readAsText(file)
      .then(function(text){
        expect(text).toEqual('world');
      })
      .then(() => done(), done);
  });

  it('throws an error if file is not read', function(done){
    const file = new Array(['not file', Date.now()]);
    readAsText(file)
      .then(function(res){
        throw Error('Should have thrown an error', res);
      }, function(err){
        expect(err.message).toInclude(`Failed to execute 'readAsText'`);
      })
      .then(() => done(), done);
  });
});
