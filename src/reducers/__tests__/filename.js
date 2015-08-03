'use strict';

const expect = require('expect');

const filename = require('../filename');
const {
  CHANGE_FILE,
  UPDATE_FILENAME
} = require('../../constants');

describe('#filename', function(){
  const payload = { filename: 'test' };

  it('returns empty string when initial state is undefined and type is not matched', function(done){
    const initial = undefined;
    const action = { type: undefined, payload: payload };
    const state = filename(initial, action);
    expect(state).toEqual('');
    done();
  });

  it('returns initial state when type is not matched', function(done){
    const initial = 'initial';
    const action = { type: undefined, payload: payload };
    const state = filename(initial, action);
    expect(state).toEqual(initial);
    done();
  });

  describe('returns action.payload.filename when type matches', function(){
    it('CHANGE_FILE', function(done){
      const initial = 'initial';
      const action = { type: CHANGE_FILE, payload: payload };
      const state = filename(initial, action);
      expect(state).toEqual(payload.filename);
      done();
    });

    it('UPDATE_FILENAME', function(done){
      const initial = 'initial';
      const action = { type: UPDATE_FILENAME, payload: payload };
      const state = filename(initial, action);
      expect(state).toEqual(payload.filename);
      done();
    });

    it('even if initial state is undefined', function(done){
      const initial = undefined;
      const action = { type: UPDATE_FILENAME, payload: payload };
      const state = filename(initial, action);
      expect(state).toEqual(payload.filename);
      done();
    });
  });

  it('returns undefined when type matches and action.payload.filename is undefined', function(done){
      const initial = 'initial';
      const payload = {};
      const action = { type: UPDATE_FILENAME, payload: payload };
      const state = filename(initial, action);
      expect(state).toEqual(undefined);
    done();
  });
});
