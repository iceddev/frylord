'use strict';

var expect = require('expect');

var projects = require('../projects');

describe('#projects', function(){
  var state, type, payload, action;

  beforeEach(function(){
    state = [
    'project1',
    'project2'
    ];

    type = 'NOT_VALID_TYPE';

    payload = {
      projects: [
        'payload1',
        'payload2'
      ]
    };

    action = {
      type: type,
      payload: payload
    };
  });

  afterEach(function(){
    state = type = payload = action = null;
  });

  describe('returns an empty array when', function(){
    it('type does not match and state is undefined', function(done){
      state = undefined;
      var res = projects(state, action);
      expect(res instanceof Array).toBe(true);
      expect(res).toEqual([]);
      done();
    });

    describe('type is matched and action.payload.projects is', function(){
      beforeEach(function(){
        action.type = 'DELETE_DIRECTORY';
      });

      it('undefined', function(done){
        action.payload.projects = undefined;
        var res = projects(state, action);
        expect(res instanceof Array).toBe(true);
        expect(res).toEqual([]);
        done();
      });

      it('null', function(done){
        action.payload.projects = null;
        var res = projects(state, action);
        expect(res instanceof Array).toBe(true);
        expect(res).toEqual([]);
        done();
      });
    });
  });

  describe('returns action.payload.projects when type is matches', function(){
    it('DELETE_DIRECTORY', function(done){
      action.type = 'DELETE_DIRECTORY';
      expect(projects(state, action)).toBe(action.payload.projects);
      done();
    });

    it('CHANGE_DIRECTORY', function(done){
      action.type = 'CHANGE_DIRECTORY';
      expect(projects(state, action)).toBe(action.payload.projects);
      done();
    });
  });

  it('returns state when type is undefined', function(done){
    action.type = undefined;
    expect(projects(state, action)).toEqual(state);
    done();
  });

  describe.skip('throws an error if', function(){
    it('action.type is undefined', function(done){
      action.type = undefined;
      expect(function() {
        projects(state, action);
      }).toThrow(/Type Error: action.type is undefined/);
      done();
    });

    it('action.payload is undefined', function(done){
      action.payload = undefined;
      expect(function() {
        projects(state, action);
      }).toThrow(/Type Error: action.payload is undefined/);
      done();
    });
  });
});
