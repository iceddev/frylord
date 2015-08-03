'use strict';

var expect = require('expect');

var filename = require('../filename');

describe('#filename', function(){
  var state, type, payload, action;

  beforeEach(function(){
    state = 'file1.js';
    type = 'NOT_VALID_TYPE';
    payload = {
      filename: 'blink.js'
    };
    action = {
      type: type,
      payload: payload
    };
  });

  afterEach(function(){
    state = type = payload = action = null;
  });

  it('returns an empty string when state is undefined', function(done){
    state = undefined;
    expect(filename(state, action))
    .toBeA('string')
    .toBe('');
    done();
  });

  it('returns state when type in not matched', function(done){
    expect(filename(state, action)).toBe(state);
    done();
  });

  describe('returns action.payload.filename when type matches', function(){
    it('CHANGE_FILE', function(done){
      action.type = 'CHANGE_FILE';
      expect(filename(state, action)).toBe(action.payload.filename);
      done();
    });

    it('UPDATE_FILENAME', function(done){
      action.type = 'UPDATE_FILENAME';
      expect(filename(state, action)).toBe(action.payload.filename);
      done();
    });

    it('even if state is undefined', function(done){
      action.type = 'CHANGE_FILE';
      state = undefined;
      expect(filename(state, action)).toBe(action.payload.filename);
      done();
    });
  });

  describe('throws an error', function(){
    it.skip('when state is not a string', function(done){
      state = {};
      expect(function() {
        filename(state, action);
      }).toThrow(/Type Error: 'state' must be a string/);
      done();
    });

    it.skip('when action.type is undefined', function(done){
      action.type = undefined;
      expect(function(){
        filename(state, action);
      }).toThrow(/Type Error: 'type' cannot be undefined/);
      done();
    });

    it('when action.payload is undefined', function(done){
      action.payload = undefined;
      action.type = 'CHANGE_FILE';
      expect(function(){
        filename(state, action);
      }).toThrow(/Cannot read property 'filename' of undefined/);
      done();
    });
  });

  it('returns undefined when type matches and action.payload.filename is undefined', function(done){
    action.payload.filename = undefined;
    action.type = 'CHANGE_FILE';
    expect(filename(state, action)).toBeA('undefined');
    done();
  });

});
