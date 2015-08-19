'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { refreshDirectoryError } = require('../');
const { ERROR } = require('../../constants');
const { REFRESH_DIRECTORY_FAILURE } = require('../../status-constants');

describe(`refreshDirectoryError creator`, function(){
  const err = new Error('Refresh dir error');
  const action = refreshDirectoryError(err);

  it(`returns a "Flux Standard Action`, function(done){
    expect(isFSA(action)).toEqual(true);
    done();
  });

  it(`returns an action with a type equal to 'ERROR'`, function(done){
    expect(action.type).toEqual(ERROR);
    done();
  });

  it(`returns a payload.status that matches 'REFRESH_DIRECTORY_FAILURE'`, function(done){
    expect(action.payload.status).toEqual(REFRESH_DIRECTORY_FAILURE);
    done();
  });

  it(`returns the original error in payload.error`, function(done){
    expect(action.payload.error).toEqual(err);
    done();
  });
});