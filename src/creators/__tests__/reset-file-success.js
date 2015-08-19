'use strict';

const expect = require('expect');
const { keys, isEqual } = require('lodash');
const { isFSA } = require('flux-standard-action');

const { resetFileSuccess } = require('../');
const { RESET_FILE } = require('../../constants');

describe('resetFileSuccess creator', function(){
  const actionProperties = [
    'type',
    'payload'
  ];
  const payloadProperties = [];
  const action = resetFileSuccess();
  const actionKeys = keys(action);
  const payloadKeys = keys(action.payload);

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(action)).toEqual(true);
    done();
  });

  it(`returns an action with type equal to 'RESET_FILE'`, function(done){
    expect(action.type).toEqual(RESET_FILE);
    done();
  });

  it(`returns an empty object in action.payload`, function(done){
    expect(action.payload).toEqual({});
    done();
  });

  it(`ignores arguments if they are passed`, function(done){
    const action = resetFileSuccess({filename: 'test.txt'});
    expect(action.payload).toEqual({});
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