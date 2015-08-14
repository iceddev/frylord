'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { saveFileSuccess } = require('../');
const { SAVE_FILE } = require('../../constants');
const { SAVE_FILE_SUCCESS } = require('../../status-constants');

describe('saveFileSuccess creator', function(){
  let data, creaction;

  before(function(done){
    data = {
      listing: [
        'file1.txt',
        'file2.txt'
      ],
      filename: 'saveFileSuccess.txt'
    };
    creaction = saveFileSuccess(data);
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

  it(`returns an action with type equal to '${SAVE_FILE}'`, function(done){
    expect(creaction.type).toEqual(SAVE_FILE);
    done();
  });

  it(`returns an action.payload.notification that includes filename`, function(done){
    expect(creaction.payload.notification).toInclude(data.filename);
    done();
  });

  it(`returns an action.payload.status that equals '${SAVE_FILE_SUCCESS}'`, function(done){
    expect(creaction.payload.status).toEqual(SAVE_FILE_SUCCESS);
    done();
  });

  it(`attaches the 'filename' property of data arg to action.payload`, function(done){
    expect(creaction.payload.filename).toEqual(data.filename);
    done();
  });

  it(`attaches the 'listing' property of data arg to action.payload`, function(done){
    expect(creaction.payload.listing).toEqual(data.listing);
    done();
  });
});