'use strict';

const expect = require('expect');

const content = require('../content');
const {
  CHANGE_FILE,
  UPDATE_CONTENT,
  RESET_FILE,
  NEW_FILE
} = require('../../constants');

describe('content reducer', function(){
  const payload = { content: 'test' };

  it('return an empty string if the initial state is undefined and action type does not match', function(done){
    const initial = undefined;
    const action = {};
    const state = content(initial, action);
    expect(state).toEqual('');
    done();
  });

  it('returns the initial state if action type does not match', function(done){
    const initial = 'test';
    const action = {};
    const state = content(initial, action);
    expect(state).toEqual(initial);
    done();
  });

  it('returns an empty string when type matches RESET_FILE', function(done){
    const initial = 'Has Content';
    const type = RESET_FILE;
    const state = content(initial, { type, payload });
    expect(state).toEqual('');
    done();
  });

  describe('returns state equal to payload.content when type matches', function(){
    it('CHANGE_FILE', function(done){
      const initial = '';
      const type = CHANGE_FILE;
      const state = content(initial, { type, payload });
      expect(state).toEqual(payload.content);
      done();
    });

    it('UPDATE_CONTENT', function(done){
      const initial = '';
      const type = UPDATE_CONTENT;
      const state = content(initial, { type, payload });
      expect(state).toEqual(payload.content);
      done();
    });

    it('NEW_FILE', function(done){
      const initial = '';
      const type = NEW_FILE;
      const state = content(initial, { type, payload });
      expect(state).toEqual(payload.content);
      done();
    });

    it('even if the initial state is undefined', function(done){
      const initial = undefined;
      const type = UPDATE_CONTENT;
      const state = content(initial, { type, payload });
      expect(state).toEqual(payload.content);
      done();
    });
  });
});
