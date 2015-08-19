'use strict';

const expect = require('expect');
const { pick } = require('lodash');
const { isFSA } = require('flux-standard-action');

const { refreshDirectorySuccess } = require('../');
const { REFRESH_DIRECTORY } = require('../../constants');
const { REFRESH_DIRECTORY_SUCCESS } = require('../../status-constants');

describe('refreshDirectorySuccess creator', function(){
  const notification = 'Current working directory updated';
  const listing = [
    'file1.txt',
    'file2.txt'
  ];
  const action = refreshDirectorySuccess(listing);

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(action)).toEqual(true);
    done();
  });

  it(`returns an action with type equal to 'REFRESH_DIRECTORY'`, function(done){
    expect(action.type).toEqual(REFRESH_DIRECTORY);
    done();
  });

  it(`returns an action.payload.notification that is '${notification}'`, function(done){
    expect(action.payload.notification).toEqual(notification);
    done();
  });

  it(`returns an action.payload.status that equals 'REFRESH_DIRECTORY_SUCCESS'`, function(done){
    expect(action.payload.status).toEqual(REFRESH_DIRECTORY_SUCCESS);
    done();
  });

  it(`attaches the 'listing' argument to action.payload`, function(done){
    expect(action.payload.listing).toEqual(listing);
    done();
  });

  it(`returns an action.payload object that only has known properties`, function(done){
    const expectedProps = [
      'notification',
      'status',
      'listing'
    ];
    expect(pick(action.payload, expectedProps)).toEqual(action.payload);
    done();
  });
});