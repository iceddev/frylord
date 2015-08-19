'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { resetFileSuccess } = require('../');
const { RESET_FILE } = require('../../constants');

describe('resetFileSuccess creator', function(){
  const creaction = resetFileSuccess();

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(creaction)).toEqual(true);
    done();
  });

  it(`returns an action with type equal to '${RESET_FILE}'`, function(done){
    expect(creaction.type).toEqual(RESET_FILE);
    done();
  });

  it(`returns an empty object in action.payload`, function(done){
    expect(creaction.payload).toEqual({});
    done();
  });

  it(`ignores arguments if they are passed`, function(done){
    const creaction = resetFileSuccess({filename: 'test.txt'});
    expect(creaction.payload).toEqual({});
    done();
  });
});