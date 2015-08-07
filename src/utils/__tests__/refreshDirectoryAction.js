'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const refreshDirectoryAction = require('../refresh-directory-action');
const { REFRESH_DIRECTORY } = require('../../constants');

describe('refreshDirectoryAction Util', function(){
  const ref = {
        listing: 'item one',
        two: 'item two'
      };

  it('returns a Flux Standard Action (FSA) object', function(done){
    const action = refreshDirectoryAction(ref);
    expect(isFSA(action)).toEqual(true);
    done();
  });

  it('returns an object with "REFRESH_DIRECTORY" type', function(done){
    const msg = refreshDirectoryAction(ref);
    expect(msg.type).toEqual(REFRESH_DIRECTORY);
    done();
  });

  it('extracts "listing" from argument and returns it as payload.listing', function(done){
    const msg = refreshDirectoryAction(ref);
    expect(msg.payload.listing).toEqual(ref.listing);
    done();
  });
});
