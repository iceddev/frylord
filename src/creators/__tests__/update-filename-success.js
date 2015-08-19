'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { updateFilenameSuccess } = require('../');
const { UPDATE_FILENAME } = require('../../constants');

describe('updateFilenameSuccess creator', function(){
  const filename = 'updateFilenameSuccess.txt';
  const action = updateFilenameSuccess(filename);

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
});