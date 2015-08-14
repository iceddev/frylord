'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { updateFilenameSuccess } = require('../');
const { UPDATE_FILENAME } = require('../../constants');

describe('updateFilenameSuccess creator', function(){
  let filename, creaction;

  before(function(done){
    filename = 'updateFilenameSuccess.txt';
    creaction = updateFilenameSuccess(filename);
    done();
  });

  after(function(done){
    filename = creaction = null;
    done();
  });

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(creaction)).toEqual(true);
    done();
  });

  it(`returns an action with type equal to '${UPDATE_FILENAME}'`, function(done){
    expect(creaction.type).toEqual(UPDATE_FILENAME);
    done();
  });

  it(`returns an action.payload with filename as property`, function(done){
    expect(creaction.payload).toEqual({ filename });
    done();
  });
});