'use strict';

const { includes } = require('lodash');
const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { changeFileError } = require('../');
const { ERROR } = require('../../constants');
const { CHANGE_FILE_FAILURE } = require('../../status-constants');


describe('changeFileError creator', function(){
  function ChangeFileError(message) {
    this.name = 'ChangeFileError';
    this.message = message || 'Change file error';
  }
  ChangeFileError.prototype = Object.create(Error.prototype);
  ChangeFileError.prototype.constructor = ChangeFileError;

  let filename = 'changeFileName.txt';
  let err = new ChangeFileError();
  let creaction = changeFileError(filename, err);

  after(function(){
    creaction = filename = err = null;
  });

  it('returns a "Flux Standard Action', function(done){
    expect(isFSA(creaction)).toEqual(true);
    done();
  });

  it(`returns an action with a type equal to '${ERROR}'`, function(done){
    expect(creaction.type).toEqual(ERROR);
    done();
  });

  it('returns a payload.notification msg that includes the filename', function(done){
    expect(creaction.payload.notification).toInclude(filename);
    done();
  });

  it(`returns a payload.status that matches '${CHANGE_FILE_FAILURE}'`, function(done){
    expect(creaction.payload.status).toEqual(CHANGE_FILE_FAILURE);
    done();
  });

  it('returns the original error in payload.error', function(done){
    expect(creaction.payload.error).toEqual(err);
    done();
  });

  it('returns the original arguments in payload.args', function(done){
    let args = creaction.payload.args;
    let test = includes(args, filename);
    expect(test).toEqual(true);
    args = creaction.payload.args;
    test = includes(args, err);
    expect(test).toEqual(true);
    done();
  });
});