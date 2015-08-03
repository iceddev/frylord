'use strict';

const expect = require('expect');

const status = require('../status');
const {
  ERROR,
  SAVE_FILE,
  DELETE_FILE,
  CHANGE_FILE,
  DELETE_DIRECTORY,
  CHANGE_DIRECTORY
} = require('../../constants');

describe('#status', function(){
  describe('returns an empty string', function(){
    it('when type matches and action.payload.status is undefined', function(done){
      const initial = 'test';
      const payload = {};
      const action = { type: ERROR, payload: payload };
      const state = status(initial, action);
      expect(state).toEqual('');
      done();
    });

    it('when type is not matched and initial state is undefined', function(done){
      const initial = undefined;
      const action = { type: undefined, payload: 'test'};
      const state = status(initial, action);
      expect(state).toEqual('');
      done();
    });
  });

  describe('returns action.payload.status when it exists and type matches', function(){
    const payload = { status: 'passed'};
    const initial = 'test';

    it('ERROR', function(done){
      const action = { type: ERROR, payload: payload };
      const state = status(initial, action);
      expect(state).toEqual(payload.status);
      done();
    });

    it('SAVE_FILE', function(done){
      const action = { type: SAVE_FILE, payload: payload };
      const state = status(initial, action);
      expect(state).toEqual(payload.status);
      done();
    });

    it('DELETE_FILE', function(done){
      const action = { type: DELETE_FILE, payload: payload };
      const state = status(initial, action);
      expect(state).toEqual(payload.status);
      done();
    });

    it('CHANGE_FILE', function(done){
      const action = { type: CHANGE_FILE, payload: payload };
      const state = status(initial, action);
      expect(state).toEqual(payload.status);
      done();
    });

    it('DELETE_DIRECTORY', function(done){
      const action = { type: DELETE_DIRECTORY, payload: payload };
      const state = status(initial, action);
      expect(state).toEqual(payload.status);
      done();
    });

    it('CHANGE_DIRECTORY', function(done){
      const action = { type: CHANGE_DIRECTORY, payload: payload };
      const state = status(initial, action);
      expect(state).toEqual(payload.status);
      done();
    });
  });
});
