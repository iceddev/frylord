'use strict';

const expect = require('expect');

const directory = require('../directory');
const {
  SAVE_FILE,
  DELETE_FILE,
  CHANGE_DIRECTORY,
  REFRESH_DIRECTORY
} = require('../../constants');

describe('#directory', function(){
  const payload = {
    listing: [
      'file1',
      'file2'
    ]
  };

  it('returns empty array when initial state is undefined and type does not match', function(done){
    const initial = undefined;
    const type = undefined;
    const state = directory(initial, { type, payload });
    expect(state).toEqual([]);
    done();
  });

  it('returns undefined if action.payload.listing is undefined', function(done){
    const initial = 'test';
    const type = SAVE_FILE;
    const payload = {};
    const state = directory(initial, { type, payload });
    expect(state).toEqual(undefined);
    done();
  });

  it('returns initial state when type is not matched', function(done){
    const initial = 'test';
    const type = undefined;
    const payload = {};
    const state = directory(initial, { type, payload });
    expect(state).toEqual(initial);
    done();
  });

  describe('returns action.payload.listing when type matches', function(){
    it('SAVE_FILE', function(done){
      const initial = 'test';
      const type = SAVE_FILE;
      const state = directory(initial, { type, payload });
      expect(state).toEqual(payload.listing);
      done();
    });

    it('DELETE_FILE', function(done){
      const initial = 'test';
      const type = DELETE_FILE;
      const state = directory(initial, { type, payload });
      expect(state).toEqual(payload.listing);
      done();
    });

    it('CHANGE_DIRECTORY', function(done){
      const initial = 'test';
      const type = CHANGE_DIRECTORY;
      const state = directory(initial, { type, payload });
      expect(state).toEqual(payload.listing);
      done();
    });

    it('REFRESH_DIRECTORY', function(done){
      const initial = 'test';
      const type = REFRESH_DIRECTORY;
      const state = directory(initial, { type, payload });
      expect(state).toEqual(payload.listing);
      done();
    });

    it('even if initial state is undefined', function(done){
      const initial = undefined;
      const type = SAVE_FILE;
      const state = directory(initial, { type, payload });
      expect(state).toEqual(payload.listing);
      done();
    });
  });
});

