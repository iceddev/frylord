'use strict';

const expect = require('expect');

const notFound = require('../not-found');

describe('notFound util', function(){
  const err = new Error();

  it('should return "false" when err.notFound is undefined', function(done){
    expect(notFound(err)).toEqual(false);
    done();
  });

  it('should return "true" when err.notFound is true', function(done){
    err.notFound = true;
    expect(notFound(err)).toEqual(true);
    done();
  });
});
