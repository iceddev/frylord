'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { updateContentSuccess } = require('../');
const { UPDATE_CONTENT } = require('../../constants');

describe('updateContentSuccess creator', function(){
  let filename, content, creaction;

  before(function(done){
    filename = 'updateContentSuccess.txt';
    content = `The content of ${filename}`;
    creaction = updateContentSuccess(content);
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

  it(`returns an action with type equal to '${UPDATE_CONTENT}'`, function(done){
    expect(creaction.type).toEqual(UPDATE_CONTENT);
    done();
  });

  it(`returns an action.payload.unsaved that equals 'true'`, function(done){
    expect(creaction.payload.unsaved).toEqual(true);
    done();
  });

  it(`attaches the 'content' argument to action.payload`, function(done){
    expect(creaction.payload.content).toEqual(content);
    done();
  });
});