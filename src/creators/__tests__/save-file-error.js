'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { saveFileError } = require('../');
const { ERROR } = require('../../constants');
const { SAVE_FILE_FAILURE } = require('../../status-constants');


describe('saveFileError creator', function(){
  function SaveFileError(message) {
    this.name = 'SaveFileError';
    this.message = message || 'Save file error';
  }
  SaveFileError.prototype = Object.create(Error.prototype);
  SaveFileError.prototype.constructor = SaveFileError;

  let filename = 'saveFileName.txt';
  let err = new SaveFileError();
  let creaction = saveFileError(filename, err);

  after(function(){
    creaction = filename = err = null;
  });

  it('returns a "Flux Standard Action', function(done){
    expect(isFSA(creaction)).toEqual(true);
    done();
  });

  it(`returns an action with a type equal to '${ERROR}'`, function(done){
    expect(creaction.type).toEqual(ERROR);
    done();
  });

  it('returns a payload.notification msg that includes the filename', function(done){
    expect(creaction.payload.notification).toInclude(filename);
    done();
  });

  it(`returns a payload.status that matches '${SAVE_FILE_FAILURE}'`, function(done){
    expect(creaction.payload.status).toEqual(SAVE_FILE_FAILURE);
    done();
  });

  it('returns the original error in payload.error', function(done){
    expect(creaction.payload.error).toEqual(err);
    done();
  });
});