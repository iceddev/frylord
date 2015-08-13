'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { deleteDirectoryError } = require('../');
const { ERROR } = require('../../constants');
const { DELETE_DIRECTORY_FAILURE } = require('../../status-constants');


describe('deleteDirectoryError creator', function(){
  function DeleteDirectoryError(message) {
    this.name = 'DeleteDirectoryError';
    this.message = message || 'delete dir error';
  }
  DeleteDirectoryError.prototype = Object.create(Error.prototype);
  DeleteDirectoryError.prototype.constructor = DeleteDirectoryError;

  let dirpath = 'delete/directory/error/';
  let err = new DeleteDirectoryError();
  let creaction = deleteDirectoryError(dirpath, err);

  after(function(){
    creaction = dirpath = err = null;
  });

  it('returns a "Flux Standard Action', function(done){
    expect(isFSA(creaction)).toEqual(true);
    done();
  });

  it(`returns an action with a type equal to '${ERROR}'`, function(done){
    expect(creaction.type).toEqual(ERROR);
    done();
  });

  it('returns a payload.notification msg that includes the dirpath', function(done){
    expect(creaction.payload.notification).toInclude(dirpath);
    done();
  });

  it(`returns a payload.status that matches '${DELETE_DIRECTORY_FAILURE}'`, function(done){
    expect(creaction.payload.status).toEqual(DELETE_DIRECTORY_FAILURE);
    done();
  });

  it('returns the original error in payload.error', function(done){
    expect(creaction.payload.error).toEqual(err);
    done();
  });
});