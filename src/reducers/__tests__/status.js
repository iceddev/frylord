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
  const payload = { status: 'passed'};

  describe('returns an empty string', function(){
    it('when type matches and action.payload.status is undefined', function(done){
      const initial = 'test';
      const type = ERROR;
      const payload = {};
      const state = status(initial, { type, payload });
      expect(state).toEqual('');
      done();
    });

    it('when type is not matched and initial state is undefined', function(done){
      const initial = undefined;
      const type = undefined;
      const state = status(initial, { type, payload });
      expect(state).toEqual('');
      done();
    });
  });

  describe('returns action.payload.status when it exists and type matches', function(){
    const initial = 'test';

    it('ERROR', function(done){
      const type = ERROR;
      const state = status(initial, { type, payload });
      expect(state).toEqual(payload.status);
      done();
    });

    it('SAVE_FILE', function(done){
      const type = SAVE_FILE;
      const state = status(initial, { type, payload });
      expect(state).toEqual(payload.status);
      done();
    });

    it('DELETE_FILE', function(done){
      const type = DELETE_FILE;
      const state = status(initial, { type, payload });
      expect(state).toEqual(payload.status);
      done();
    });

    it('CHANGE_FILE', function(done){
      const type = CHANGE_FILE;
      const state = status(initial, { type, payload });
      expect(state).toEqual(payload.status);
      done();
    });

    it('DELETE_DIRECTORY', function(done){
      const type = DELETE_DIRECTORY;
      const state = status(initial, { type, payload });
      expect(state).toEqual(payload.status);
      done();
    });

    it('CHANGE_DIRECTORY', function(done){
      const type = CHANGE_DIRECTORY;
      const state = status(initial, { type, payload });
      expect(state).toEqual(payload.status);
      done();
    });
  });
});
