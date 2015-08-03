'use strict';

var expect = require('expect');

var directory = require('../directory');

describe('#directory', function(){
  var state, type, payload, action;

  beforeEach(function(){
    state = ['file1', 'file2'];
    type = 'NOT_VALID_TYPE';
    payload = {
      listing: 'file3'
    };
    action = {
      type: type,
      payload: payload
    };
  });

  afterEach(function(){
    state = type = payload = action = null;
  });

  it('returns an empty array when state is undefined and type does not match', function(done){
    state = undefined;
    var response = directory(state, action);
    expect(response instanceof Array).toBe(true);
    expect(response.length).toBe(0);
    done();
  });

  it('throws an error if action.payload is undefined', function(done){
    action.payload = undefined;
    action.type = 'SAVE_FILE';
    expect(function(){
      directory(state, action);
    }).toThrow(/Cannot read property 'listing'/);
    done();
  });

  it('returns undefined if action.payload.listing is undefined', function(done){
    action.payload.listing = undefined;
    action.type = 'SAVE_FILE';
    expect(directory(state, action)).toBeAn('undefined');
    done();
  });

  it('returns state when type is not matched', function(done){
    expect(directory(state, action)).toBe(state);
    done();
  });

  it.skip('throws an error if state is not an array', function(done){
    state = 'string';
    expect(function() {
      directory(state, action);
    }).toThrow(/Type Error: 'state' is not an Array/);
    done();
  });

  describe('returns action.payload.listing when type matches', function(){
    it('SAVE_FILE', function(done){
      action.type = 'SAVE_FILE';
      expect(directory(state, action)).toBe(action.payload.listing);
      done();
    });

    it('DELETE_FILE', function(done){
      action.type = 'DELETE_FILE';
      expect(directory(state, action)).toBe(action.payload.listing);
      done();
    });

    it('CHANGE_DIRECTORY', function(done){
      action.type = 'CHANGE_DIRECTORY';
      expect(directory(state, action)).toBe(action.payload.listing);
      done();
    });

    it('REFRESH_DIRECTORY', function(done){
      action.type = 'REFRESH_DIRECTORY';
      expect(directory(state, action)).toBe(action.payload.listing);
      done();
    });

    it('even if state is undefined', function(done){
      action.type = 'REFRESH_DIRECTORY';
      state = undefined;
      expect(directory(state, action)).toBe(action.payload.listing);
      done();
    });
  });
});

