'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { deleteFileError } = require('../');
const { ERROR } = require('../../constants');
const { DELETE_FILE_FAILURE } = require('../../status-constants');


describe('deleteFileError creator', function(){
  function DeleteFileError(message) {
    this.name = 'DeleteFileError';
    this.message = message || 'delete file error';
  }
  DeleteFileError.prototype = Object.create(Error.prototype);
  DeleteFileError.prototype.constructor = DeleteFileError;

  let filename = 'deleteFileError.txt';
  let err = new DeleteFileError();
  let creaction = deleteFileError(filename, err);

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

  it(`returns a payload.status that matches '${DELETE_FILE_FAILURE}'`, function(done){
    expect(creaction.payload.status).toEqual(DELETE_FILE_FAILURE);
    done();
  });

  it('returns the original error in payload.error', function(done){
    expect(creaction.payload.error).toEqual(err);
    done();
  });
});