'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { deleteFileError } = require('../');
const { ERROR } = require('../../constants');
const { DELETE_FILE_FAILURE } = require('../../status-constants');


describe('deleteFileError creator', function(){
  const filename = 'deleteFileError.txt';
  const err = new Error('delete file error');
  const action = deleteFileError(filename, err);

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(action)).toEqual(true);
    done();
  });

  it(`returns an action with a type equal to 'ERROR'`, function(done){
    expect(action.type).toEqual(ERROR);
    done();
  });

  it(`returns a payload.notification msg that includes the filename`, function(done){
    expect(action.payload.notification).toInclude(filename);
    done();
  });

  it(`returns a payload.status that matches 'DELETE_FILE_FAILURE'`, function(done){
    expect(action.payload.status).toEqual(DELETE_FILE_FAILURE);
    done();
  });

  it(`returns the original error in payload.error`, function(done){
    expect(action.payload.error).toEqual(err);
    done();
  });
});