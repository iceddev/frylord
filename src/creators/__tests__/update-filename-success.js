'use strict';

const expect = require('expect');
const { keys, isEqual } = require('lodash');
const { isFSA } = require('flux-standard-action');

const { updateFilenameSuccess } = require('../');
const { UPDATE_FILENAME } = require('../../constants');

describe('updateFilenameSuccess creator', function(){
  const actionProperties = [
    'type',
    'payload'
  ];
  const payloadProperties = [
    'filename'
  ];
  const filename = 'updateFilenameSuccess.txt';
  const action = updateFilenameSuccess(filename);
  const actionKeys = keys(action);
  const payloadKeys = keys(action.payload);

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(action)).toEqual(true);
    done();
  });

  it(`returns an action with type equal to 'UPDATE_FILENAME'`, function(done){
    expect(action.type).toEqual(UPDATE_FILENAME);
    done();
  });

  it(`returns an action.payload with filename as property`, function(done){
    expect(action.payload).toEqual({ filename });
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