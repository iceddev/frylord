'use strict';

const expect = require('expect');
const { pick } = require('lodash');
const { isFSA } = require('flux-standard-action');

const { updateContentSuccess } = require('../');
const { UPDATE_CONTENT } = require('../../constants');

describe('updateContentSuccess creator', function(){
  const filename = 'updateContentSuccess.txt';
  const content = `The content of ${filename}`;
  const action = updateContentSuccess(content);

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(action)).toEqual(true);
    done();
  });

  it(`returns an action with type equal to 'UPDATE_CONTENT'`, function(done){
    expect(action.type).toEqual(UPDATE_CONTENT);
    done();
  });

  it(`returns an action.payload.unsaved that equals 'true'`, function(done){
    expect(action.payload.unsaved).toEqual(true);
    done();
  });

  it(`attaches the 'content' argument to action.payload`, function(done){
    expect(action.payload.content).toEqual(content);
    done();
  });

  it(`returns an action.payload object that only has known properties`, function(done){
    const expectedProps = [
      'content',
      'unsaved'
    ];
    expect(pick(action.payload, expectedProps)).toEqual(action.payload);
    done();
  });
});