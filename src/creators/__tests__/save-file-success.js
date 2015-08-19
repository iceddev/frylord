'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { saveFileSuccess } = require('../');
const { SAVE_FILE } = require('../../constants');
const { SAVE_FILE_SUCCESS } = require('../../status-constants');

describe('saveFileSuccess creator', function(){
  const data = {
    listing: [
      'file1.txt',
      'file2.txt'
    ],
    filename: 'saveFileSuccess.txt'
  };
  const action = saveFileSuccess(data);

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(action)).toEqual(true);
    done();
  });

  it(`returns an action with type equal to 'SAVE_FILE'`, function(done){
    expect(action.type).toEqual(SAVE_FILE);
    done();
  });

  it(`returns an action.payload.notification that includes filename`, function(done){
    expect(action.payload.notification).toInclude(data.filename);
    done();
  });

  it(`returns an action.payload.status that equals 'SAVE_FILE_SUCCESS'`, function(done){
    expect(action.payload.status).toEqual(SAVE_FILE_SUCCESS);
    done();
  });

  it(`attaches the 'filename' property of data arg to action.payload`, function(done){
    expect(action.payload.filename).toEqual(data.filename);
    done();
  });

  it(`attaches the 'listing' property of data arg to action.payload`, function(done){
    expect(action.payload.listing).toEqual(data.listing);
    done();
  });
});