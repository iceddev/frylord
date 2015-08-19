'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { deleteDirectoryError } = require('../');
const { ERROR } = require('../../constants');
const { DELETE_DIRECTORY_FAILURE } = require('../../status-constants');


describe(`deleteDirectoryError creator`, function(){
  const dirpath = 'delete/directory/error/';
  const err = new Error('delete dir error');
  const action = deleteDirectoryError(dirpath, err);

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(action)).toEqual(true);
    done();
  });

  it(`returns an action with a type equal to 'ERROR'`, function(done){
    expect(action.type).toEqual(ERROR);
    done();
  });

  it(`returns a payload.notification msg that includes the dirpath`, function(done){
    expect(action.payload.notification).toInclude(dirpath);
    done();
  });

  it(`returns a payload.status that matches 'DELETE_DIRECTORY_FAILURE'`, function(done){
    expect(action.payload.status).toEqual(DELETE_DIRECTORY_FAILURE);
    done();
  });

  it(`returns the original error in payload.error`, function(done){
    expect(action.payload.error).toEqual(err);
    done();
  });
});