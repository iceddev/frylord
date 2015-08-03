'use strict';

var expect = require('expect');

var notification = require('../reducers/notification');

describe('#notifcation', function(){
  var state, type, payload, action;

  beforeEach(function(){
    state = 'what';
    type = 'NOT_VALID_TYPE';
    payload = {
      notification: 'some notification'
    };
    action = {
      type: type,
      payload: payload
    };
  });

  afterEach(function(){
    state = type = payload = action = null;
  });

  it('returns an empty string when type is not matched', function(done){
    expect(notification(state, action)).toBe('');
    done();
  });

  describe('returns action.payload.notification when type matches', function(){
    it('ERROR', function(done){
      action.type = 'ERROR';
      expect(notification(state, action)).toBe(action.payload.notification);
      done();
    });

    it('SAVE_FILE', function(done){
      action.type = 'SAVE_FILE';
      expect(notification(state, action)).toBe(action.payload.notification);
      done();
    });

    it('DELETE_FILE', function(done){
      action.type = 'DELETE_FILE';
      expect(notification(state, action)).toBe(action.payload.notification);
      done();
    });

    it('CHANGE_FILE', function(done){
      action.type = 'CHANGE_FILE';
      expect(notification(state, action)).toBe(action.payload.notification);
      done();
    });

    it('DELETE_DIRECTORY', function(done){
      action.type = 'DELETE_DIRECTORY';
      expect(notification(state, action)).toBe(action.payload.notification);
      done();
    });

     it('CHANGE_DIRECTORY', function(done){
      action.type = 'CHANGE_DIRECTORY';
      expect(notification(state, action)).toBe(action.payload.notification);
      done();
    });
  });

  describe('returns an empty string if action.payload.notification is', function(){
    beforeEach(function(){
      action.type = 'ERROR';
    });

    it('undefined', function(done){
      action.payload.notification = undefined;
      expect(notification(state, action)).toBe('');
      done();
    });

    it('null', function(done){
      action.payload.notification = null;
      expect(notification(state, action)).toBe('');
      done();
    });
  });

  it.skip('throws an error when action.type is undefined', function(done){
    action.type = undefined;
    expect(function(){
      notification(state, action);
    }).toThrow(/Type Error: 'type' property of action is undefined/);
    done();
  });

  it.skip('throws an error when action.payload is undefined', function(done){
    action.payload = undefined;
    action.type = 'ERROR';
    expect(function(){
      notification(state, action);
    }).toThrow(/Type Error: 'payload' property of action is undefined/);
    done();
  });
});


