'use strict';

const expect = require('expect');

const content = require('../content');

describe('content reducer', function(){

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
    expect(state).toEqual(state);
    done();
  });

  describe('returns state equal to payload.content when type matches', function(){
    it('CHANGE_FILE', function(done){
      const initial = '';
      const payload = { content: 'test' };
      const action = { type: 'CHANGE_FILE', payload: payload };
      const state = content(initial, action);
      expect(state).toEqual(payload.content);
      done();
    });

    it('UPDATE_CONTENT', function(done){
      const initial = '';
      const payload = { content: 'test' };
      const action = { type: 'UPDATE_CONTENT', payload: payload };
      const state = content(initial, action);
      expect(state).toEqual(payload.content);
      done();
    });

    it('even if the initial state is undefined', function(done){
      const initial = undefined;
      const payload = { content: 'test' };
      const action = { type: 'UPDATE_CONTENT', payload: payload };
      const state = content(initial, action);
      expect(state).toEqual(payload.content);
      done();
    });
  });
});
