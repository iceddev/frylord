'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { refreshDirectorySuccess } = require('../');
const { REFRESH_DIRECTORY } = require('../../constants');
const { REFRESH_DIRECTORY_SUCCESS } = require('../../status-constants');

describe('refreshDirectorySuccess creator', function(){
  const notification = 'Current working directory updated';
  let listing, creaction;

  before(function(done){
    listing = [
      'file1.txt',
      'file2.txt'
    ];
    creaction = refreshDirectorySuccess(listing);
    done();
  });

  after(function(done){
    listing = creaction = null;
    done();
  });

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(creaction)).toEqual(true);
    done();
  });

  it(`returns an action with type equal to '${REFRESH_DIRECTORY}'`, function(done){
    expect(creaction.type).toEqual(REFRESH_DIRECTORY);
    done();
  });

  it(`returns an action.payload.notification that is '${notification}'`, function(done){
    expect(creaction.payload.notification).toEqual(notification);
    done();
  });

  it(`returns an action.payload.status that equals '${REFRESH_DIRECTORY_SUCCESS}'`, function(done){
    expect(creaction.payload.status).toEqual(REFRESH_DIRECTORY_SUCCESS);
    done();
  });

  it(`attaches the 'listing' argument to action.payload`, function(done){
    expect(creaction.payload.listing).toEqual(listing);
    done();
  });
});