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

  it.skip('returns a rejected promise when file is not read', function(done){
    const file = new File('not file', Date.now());
    readAsText(file)
      .then(function(text){
        expect(text).toEqual('world');
      })
      .then(() => done(), done);
  });
});
