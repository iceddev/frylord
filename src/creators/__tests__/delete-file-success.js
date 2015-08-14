'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { deleteFileSuccess } = require('../');
const { DELETE_FILE } = require('../../constants');
const { DELETE_FILE_SUCCESS } = require('../../status-constants');

describe('deleteFileSuccess creator', function(){
  let data, creaction;

  before(function(done){
    data = {
      listing: [
        'file1.txt',
        'file2.txt'
      ],
      filename: 'deleteFileSuccess.txt'
    };
    creaction = deleteFileSuccess(data);
    done();
  });

  after(function(done){
    data = creaction = null;
    done();
  });

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(creaction)).toEqual(true);
    done();
  });

  it(`returns an action with type equal to '${DELETE_FILE}'`, function(done){
    expect(creaction.type).toEqual(DELETE_FILE);
    done();
  });

  it(`returns an action.payload.notification that includes filename`, function(done){
    expect(creaction.payload.notification).toInclude(data.filename);
    done();
  });

  it(`returns an action.payload.status that equals '${DELETE_FILE_SUCCESS}'`, function(done){
    expect(creaction.payload.status).toEqual(DELETE_FILE_SUCCESS);
    done();
  });

  it(`attaches the 'listing' property of data arg to action.payload`, function(done){
    expect(creaction.payload.listing).toEqual(data.listing);
    done();
  });

  it(`attaches the 'filename' property of data arg to action.payload`, function(done){
    expect(creaction.payload.filename).toEqual(data.filename);
    done();
  });
});