'use strict';

const expect = require('expect');
const { keys, isEqual } = require('lodash');
const { isFSA } = require('flux-standard-action');

const { deleteFileError } = require('../');
const { ERROR } = require('../../constants');
const { DELETE_FILE_FAILURE } = require('../../status-constants');


describe('deleteFileError creator', function(){
  const actionProperties = [
    'type',
    'payload'
  ];
  const payloadProperties = [
    'notification',
    'status',
    'error'
  ];
  const filename = 'deleteFileError.txt';
  const err = new Error('delete file error');
  const action = deleteFileError(filename, err);
  const actionKeys = keys(action);
  const payloadKeys = keys(action.payload);

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

  it(`returns an action object that only has ${actionProperties.length} known ${actionProperties.length === 1 ? 'property' : 'properties'}`, function(done){
    expect(isEqual(actionKeys, actionProperties)).toEqual(true);
    done();
  });

  it(`returns an action.payload object that only has ${payloadProperties.length} known ${payloadProperties.length === 1 ? 'property' : 'properties'}`, function(done){
    expect(isEqual(payloadKeys, payloadProperties)).toEqual(true);
    done();
  });
});