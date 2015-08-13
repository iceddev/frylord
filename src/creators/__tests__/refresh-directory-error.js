'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { refreshDirectoryError } = require('../');
const { ERROR } = require('../../constants');
const { REFRESH_DIRECTORY_FAILURE } = require('../../status-constants');


describe('refreshDirectoryError creator', function(){
  function RefreshDirectoryError(message) {
    this.name = 'RefreshDirectoryError';
    this.message = message || 'Refresh dir error';
  }
  RefreshDirectoryError.prototype = Object.create(Error.prototype);
  RefreshDirectoryError.prototype.constructor = RefreshDirectoryError;

  let err = new RefreshDirectoryError();
  let creaction = refreshDirectoryError(err);

  after(function(){
    creaction = err = null;
  });

  it('returns a "Flux Standard Action', function(done){
    expect(isFSA(creaction)).toEqual(true);
    done();
  });

  it(`returns an action with a type equal to '${ERROR}'`, function(done){
    expect(creaction.type).toEqual(ERROR);
    done();
  });

  it(`returns a payload.status that matches '${REFRESH_DIRECTORY_FAILURE}'`, function(done){
    expect(creaction.payload.status).toEqual(REFRESH_DIRECTORY_FAILURE);
    done();
  });

  it('returns the original error in payload.error', function(done){
    expect(creaction.payload.error).toEqual(err);
    done();
  });
});