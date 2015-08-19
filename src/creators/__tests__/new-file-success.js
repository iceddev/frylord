'use strict';

const expect = require('expect');
const { keys, isEqual } = require('lodash');
const { isFSA } = require('flux-standard-action');

const { newFileSuccess } = require('../');
const { NEW_FILE } = require('../../constants');

describe('newFileSuccess creator', function(){
  const actionProperties = [
    'type',
    'payload'
  ];
  const payloadProperties = [
    'filename',
    'content',
    'unsaved'
  ];
  const filename = 'newFileSuccess.txt';
  const content = `The content of the ${filename}`;
  const action = newFileSuccess(filename, content);
  const actionKeys = keys(action);
  const payloadKeys = keys(action.payload);

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(action)).toEqual(true);
    done();
  });

  it(`returns an action with type equal to 'NEW_FILE'`, function(done){
    expect(action.type).toEqual(NEW_FILE);
    done();
  });

  it(`returns an action.payload.unsaved that equals 'true'`, function(done){
    expect(action.payload.unsaved).toEqual(true);
    done();
  });

  it(`attaches the 'filename' argument to action.payload`, function(done){
    expect(action.payload.filename).toEqual(filename);
    done();
  });

  it(`attaches the 'content' argument to action.payload`, function(done){
    expect(action.payload.content).toEqual(content);
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