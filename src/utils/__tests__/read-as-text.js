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

  it.skip('returns a rejected promise when file is not read', function(){
    const file = new File('not file', Date.now());
    return readAsText(file)
      .then(function(text){
        expect(text).toEqual('world');
      });
  });
});
