'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');
const { keys, isEqual, includes } = require('lodash');

const { changeFileError } = require('../');
const { ERROR } = require('../../constants');
const { CHANGE_FILE_FAILURE } = require('../../status-constants');


describe(`changeFileError creator`, function(){
  const actionProperties = [
    'type',
    'payload'
  ];
  const payloadProperties = [
    'notification',
    'status',
    'error',
    'args'
  ];
  const filename = 'changeFileName.txt';
  const err = new Error('Change file error');
  const action = changeFileError(filename, err);
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

  it(`returns a payload.status that matches 'CHANGE_FILE_FAILURE'`, function(done){
    expect(action.payload.status).toEqual(CHANGE_FILE_FAILURE);
    done();
  });

  it(`returns the original error in payload.error`, function(done){
    expect(action.payload.error).toEqual(err);
    done();
  });

  it(`returns the original arguments in payload.args`, function(done){
    let args = action.payload.args;
    let test = includes(args, filename);
    expect(test).toEqual(true);
    args = action.payload.args;
    test = includes(args, err);
    expect(test).toEqual(true);
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