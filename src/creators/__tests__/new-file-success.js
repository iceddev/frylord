'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { newFileSuccess } = require('../');
const { NEW_FILE } = require('../../constants');

describe('newFileSuccess creator', function(){
  let filename, content, creaction;

  before(function(done){
    filename = 'newFileSuccess.txt';
    content = `The content of the ${filename}`;
    creaction = newFileSuccess(filename, content);
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

  it(`returns an action with type equal to '${NEW_FILE}'`, function(done){
    expect(creaction.type).toEqual(NEW_FILE);
    done();
  });

  it(`returns an action.payload.unsaved that equals 'true'`, function(done){
    expect(creaction.payload.unsaved).toEqual(true);
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