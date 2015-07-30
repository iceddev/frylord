'use strict';

var expect = require('expect');

var content = require('../reducers/content');

describe('#content', function(){
  var state, type, payload, action;

  beforeEach(function(){
    state = 'state';
    type = 'NOT_VALID_TYPE';
    payload = {
      content: 'test content'
    };
    action = {
      type: type,
      payload: payload
    };
  });

  afterEach(function(){
    state = type = payload = action = null;
  });

  it('return an empty string if the first argument is undefined', function(done){
    state = undefined;
    expect(content(state, action))
      .toBe('')
      .toBeA('string', 'must return a string');
    done();
  });

  it('returns the first argument if type does not match', function(done){
    expect(content(state, action)).toBe(state);
    done();
  });

  describe('returns payload.content when type matches', function(){
    it('CHANGE_FILE', function(done){
      action.type = 'CHANGE_FILE';
      expect(content(state, action)).toBe(action.payload.content);
      done();
    });

    it('UPDATE_CONTENT', function(done){
      action.type = 'UPDATE_CONTENT';
      expect(content(state, action)).toBe(action.payload.content);
      done();
    });

    it('even if the first argument(state) is undefined', function(done){
      action.type = 'UPDATE_CONTENT';
      state = undefined;
      expect(content(state, action)).toBe(action.payload.content);
      done();
    });
  });


  it.skip('throws an error if action.type is undefined', function(done){
    action.type = undefined;
    expect(function() {
      content(state, action);
    }).toThrow(/'type' not defined/);
    done();
  });

  it.skip('should set an error flag to true on the action if a type error occurred', function(done){
    action.type = undefined;
    action.error = false;
    content(state, action);
    expect(action.error).toBe(true);
    done();
  });

  it.skip('throws an error if action.payload.content is undefined', function(done){
    action.payload.content = undefined;
    expect(function() {
      content(state, action);
    }).toThrow(/'content' of the 'payload' argument is not defined/);
    done();
  });
});
