'use strict';

const expect = require('expect');

const readAsText = require('../read-as-text');

describe('readAsText Util', function(){
  it('takes a Blob and returns text', function(){
    const file = new Blob(['world']);
    return readAsText(file)
      .then(function(text){
        expect(text).toEqual('world');
      });
  });

  it('throws an error if file is not read', function(){
    const file = new Array(['not file', Date.now()]);
    return readAsText(file)
      .then(function(res){
        throw Error('Should have thrown an error', res);
      }, function(err){
        expect(err.message).toInclude(`Failed to execute 'readAsText'`);
      });
  });
});
