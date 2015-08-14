'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { changeFileSuccess } = require('../');
const { CHANGE_FILE } = require('../../constants');
const { CHANGE_FILE_SUCCESS } = require('../../status-constants');

describe('changeFileSuccess creator', function(){
  let filename, content, creaction;

  before(function(done){
    filename = 'changeFileSuccess.txt';
    content = 'The content of the file';
    creaction = changeFileSuccess(filename, content);
    done();
  });

  after(function(done){
    filename = content = creaction = null;
    done();
  });

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(creaction)).toEqual(true);
    done();
  });

  it(`returns an action with type equal to '${CHANGE_FILE}'`, function(done){
    expect(creaction.type).toEqual(CHANGE_FILE);
    done();
  });

  it(`returns an action.payload.notification that includes filename`, function(done){
    expect(creaction.payload.notification).toInclude(filename);
    done();
  });

  it(`returns an action.payload.status that equals '${CHANGE_FILE_SUCCESS}'`, function(done){
    expect(creaction.payload.status).toEqual(CHANGE_FILE_SUCCESS);
    done();
  });

  it(`attaches the 'filename' argument to action.payload`, function(done){
    expect(creaction.payload.filename).toEqual(filename);
    done();
  });

  it(`attaches the 'content' argument to action.payload`, function(done){
    expect(creaction.payload.content).toEqual(content);
    done();
  });
});