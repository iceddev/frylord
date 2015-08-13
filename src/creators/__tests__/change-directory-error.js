'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { changeDirectoryError } = require('../');
const { ERROR } = require('../../constants');
const { CHANGE_DIRECTORY_FAILURE } = require('../../status-constants');


describe('changeDirectoryError creator', function(){
  function ChangeDirectoryError(message) {
    this.name = 'ChangeDirectoryError';
    this.message = message || 'Change dir error';
  }
  ChangeDirectoryError.prototype = Object.create(Error.prototype);
  ChangeDirectoryError.prototype.constructor = ChangeDirectoryError;

  let dirpath = 'change/directory/error/';
  let err = new ChangeDirectoryError();
  let creaction = changeDirectoryError(dirpath, err);

  after(function(){
    creaction = dirpath = err = null;
  });

  it('returns a "Flux Standard Action', function(done){
    expect(isFSA(creaction)).toEqual(true);
    done();
  });

  it(`returns an action with a type equal to '${ERROR}'`, function(done){
    expect(creaction.type).toEqual(ERROR);
    done();
  });

  it('returns a payload.notification msg that includes the dirpath', function(done){
    expect(creaction.payload.notification).toInclude(dirpath);
    done();
  });

  it(`returns a payload.status that matches '${CHANGE_DIRECTORY_FAILURE}'`, function(done){
    expect(creaction.payload.status).toEqual(CHANGE_DIRECTORY_FAILURE);
    done();
  });

  it('returns the original error in payload.error', function(done){
    expect(creaction.payload.error).toEqual(err);
    done();
  });
});