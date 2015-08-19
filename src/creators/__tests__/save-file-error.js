'use strict';

const expect = require('expect');
const { pick } = require('lodash');
const { isFSA } = require('flux-standard-action');

const { saveFileError } = require('../');
const { ERROR } = require('../../constants');
const { SAVE_FILE_FAILURE } = require('../../status-constants');


describe('saveFileError creator', function(){
  const filename = 'saveFileName.txt';
  const err = new Error('Save file error');
  const action = saveFileError(filename, err);

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(action)).toEqual(true);
    done();
  });

  it(`returns an action with a type equal to 'ERROR'`, function(done){
    expect(action.type).toEqual(ERROR);
    done();
  });

  it(`returns a payload.notification msg that includes the filename`, function(done){
    expect(action.payload.notification).toInclude(filename);
    done();
  });

  it(`returns a payload.status that matches 'SAVE_FILE_FAILURE'`, function(done){
    expect(action.payload.status).toEqual(SAVE_FILE_FAILURE);
    done();
  });

  it(`returns the original error in payload.error`, function(done){
    expect(action.payload.error).toEqual(err);
    done();
  });

  it(`returns an action.payload object that only has known properties`, function(done){
    const expectedProps = [
      'notification',
      'status',
      'error'
    ];
    expect(pick(action.payload, expectedProps)).toEqual(action.payload);
    done();
  });
});