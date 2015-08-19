'use strict';

const expect = require('expect');
const { pick } = require('lodash');
const { isFSA } = require('flux-standard-action');

const { resetFileSuccess } = require('../');
const { RESET_FILE } = require('../../constants');

describe('resetFileSuccess creator', function(){
  const action = resetFileSuccess();

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(action)).toEqual(true);
    done();
  });

  it(`returns an action with type equal to 'RESET_FILE'`, function(done){
    expect(action.type).toEqual(RESET_FILE);
    done();
  });

  it(`returns an empty object in action.payload`, function(done){
    expect(action.payload).toEqual({});
    done();
  });

  it(`ignores arguments if they are passed`, function(done){
    const action = resetFileSuccess({filename: 'test.txt'});
    expect(action.payload).toEqual({});
    done();
  });

  it(`returns an action.payload object that only has known properties`, function(done){
    const expectedProps = [];
    expect(pick(action.payload, expectedProps)).toEqual(action.payload);
    done();
  });
});