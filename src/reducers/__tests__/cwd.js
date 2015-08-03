'use strict';

var expect = require('expect');

var cwd = require('../cwd');

describe('#cwd', function(){
  var state, type, payload, action;

  beforeEach(function(){
    state = '/hello';
    type = 'NOT_VALID_TYPE';
    payload = {
      cwd: '/world'
    };
    action = {
      type: type,
      payload: payload
    };
  });

  afterEach(function(){
    state = type = payload = null;
  });

  it('returns "/" if state is undefined', function(done){
    state = undefined;
    expect(cwd(state, action)).toBe('/');
    done();
  });

  it('returns state if type is not matched', function(done){
    expect(cwd(state, action)).toBe(state);
    done();
  });

  describe('returns "action.payload.cwd" when type matches', function(){
    it('CHANGE_DIRECTORY', function(done){
      action.type = 'CHANGE_DIRECTORY';
      expect(cwd(state, action)).toBe(action.payload.cwd);
      done();
    });

    it('a valid type even if state is undefined', function(done){
      action.type = 'CHANGE_DIRECTORY';
      state = undefined;
      expect(cwd(state, action)).toBe(action.payload.cwd);
      done();
    });
  });

  it('returns "undefined" if payload is undefined', function(done){
    action.type = 'CHANGE_DIRECTORY';
    action.payload = undefined;
    expect(cwd(state, action)).toBeAn('undefined');
    done();
  });

  it.skip('throws an error if the type is undefined', function(done){
    action.type = undefined;
    expect(function() {
      cwd(state, action);
    }).toThrow(/Type Error: action.type is not defined/);
    done();
  });

  it.skip('throws an error if state is not a string', function(done){
    state = {};
    expect(function() {
      cwd(state, action);
    }).toThrow(/Type Error: state is not a string/);
    done();
  });

  it.skip('sets error flag to true if type error occurs', function(done){
    action.type = undefined;
    action.error = undefined;
    cwd(state, action);
    expect(action.error).toBe(true);
    done();
  });
});
