'use strict';

const expect = require('expect');
const { pick } = require('lodash');
const { isFSA } = require('flux-standard-action');

const { changeFileSuccess } = require('../');
const { CHANGE_FILE } = require('../../constants');
const { CHANGE_FILE_SUCCESS } = require('../../status-constants');

describe('changeFileSuccess creator', function(){
  const filename = 'changeFileSuccess.txt';
  const content = 'The content of the file';
  const action = changeFileSuccess(filename, content);

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(action)).toEqual(true);
    done();
  });

  it(`returns an action with type equal to 'CHANGE_FILE'`, function(done){
    expect(action.type).toEqual(CHANGE_FILE);
    done();
  });

  it(`returns an action.payload.notification that includes filename`, function(done){
    expect(action.payload.notification).toInclude(filename);
    done();
  });

  it(`returns an action.payload.status that equals 'CHANGE_FILE_SUCCESS'`, function(done){
    expect(action.payload.status).toEqual(CHANGE_FILE_SUCCESS);
    done();
  });

  it(`attaches the 'filename' argument to action.payload`, function(done){
    expect(action.payload.filename).toEqual(filename);
    done();
  });

  it(`attaches the 'content' argument to action.payload`, function(done){
    expect(action.payload.content).toEqual(content);
    done();
  });

  it(`returns an action.payload object that only has known properties`, function(done){
    const expectedProps = [
      'notification',
      'status',
      'filename',
      'content'
    ];
    expect(pick(action.payload, expectedProps)).toEqual(action.payload);
    done();
  });
});