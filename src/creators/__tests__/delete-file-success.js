'use strict';

const expect = require('expect');
const { keys, isEqual } = require('lodash');
const { isFSA } = require('flux-standard-action');

const { deleteFileSuccess } = require('../');
const { DELETE_FILE } = require('../../constants');
const { DELETE_FILE_SUCCESS } = require('../../status-constants');

describe('deleteFileSuccess creator', function(){
  const actionProperties = [
    'type',
    'payload'
  ];
  const payloadProperties = [
    'notification',
    'status',
    'listing',
    'filename'
  ];
  const data = {
    listing: [
      'file1.txt',
      'file2.txt'
    ],
    filename: 'deleteFileSuccess.txt'
  };
  const action = deleteFileSuccess(data);
  const actionKeys = keys(action);
  const payloadKeys = keys(action.payload);

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(action)).toEqual(true);
    done();
  });

  it(`returns an action with type equal to 'DELETE_FILE'`, function(done){
    expect(action.type).toEqual(DELETE_FILE);
    done();
  });

  it(`returns an action.payload.notification that includes filename`, function(done){
    expect(action.payload.notification).toInclude(data.filename);
    done();
  });

  it(`returns an action.payload.status that equals 'DELETE_FILE_SUCCESS'`, function(done){
    expect(action.payload.status).toEqual(DELETE_FILE_SUCCESS);
    done();
  });

  it(`attaches the 'listing' property of data arg to action.payload`, function(done){
    expect(action.payload.listing).toEqual(data.listing);
    done();
  });

  it(`attaches the 'filename' property of data arg to action.payload`, function(done){
    expect(action.payload.filename).toEqual(data.filename);
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