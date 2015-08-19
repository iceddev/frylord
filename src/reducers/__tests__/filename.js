'use strict';

const expect = require('expect');

const filename = require('../filename');
const {
  CHANGE_FILE,
  UPDATE_FILENAME,
  RESET_FILE,
  NEW_FILE
} = require('../../constants');

describe('filename reducer', function(){
  const payload = { filename: 'test' };

  it('returns empty string when initial state is undefined and type is not matched', function(done){
    const initial = undefined;
    const type = undefined;
    const state = filename(initial, { type, payload });
    expect(state).toEqual('');
    done();
  });

  it('returns an empty string when type matches RESET_FILE', function(done){
    const initial = 'Has Content';
    const type = RESET_FILE;
    const state = filename(initial, { type, payload });
    expect(state).toEqual('');
    done();
  });

  it('returns initial state when type is not matched', function(done){
    const initial = 'initial';
    const type = undefined;
    const state = filename(initial, { type, payload });
    expect(state).toEqual(initial);
    done();
  });

  describe('returns action.payload.filename when type matches', function(){
    it('CHANGE_FILE', function(done){
      const initial = 'initial';
      const type = CHANGE_FILE;
      const state = filename(initial, { type, payload });
      expect(state).toEqual(payload.filename);
      done();
    });

    it('UPDATE_FILENAME', function(done){
      const initial = 'initial';
      const type = UPDATE_FILENAME;
      const state = filename(initial, { type, payload });
      expect(state).toEqual(payload.filename);
      done();
    });

    it('NEW_FILE', function(done){
      const initial = 'initial';
      const type = NEW_FILE;
      const state = filename(initial, { type, payload });
      expect(state).toEqual(payload.filename);
      done();
    });

    it('even if initial state is undefined', function(done){
      const initial = undefined;
      const type = UPDATE_FILENAME;
      const state = filename(initial, { type, payload });
      expect(state).toEqual(payload.filename);
      done();
    });
  });

  it('returns undefined when type matches and action.payload.filename is undefined', function(done){
    const initial = 'initial';
    const payload = {};
    const type = UPDATE_FILENAME;
    const state = filename(initial, { type, payload });
    expect(state).toEqual(undefined);
    done();
  });
});
