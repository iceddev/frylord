'use strict';

const expect = require('expect');

const cwd = require('../cwd');
const { CHANGE_DIRECTORY } = require('../../constants');

const payload = {
  cwd: '/world'
};
describe('#cwd', function(){


  it('returns "/" if initial state is undefined and type is not matched', function(done){
    const initial = undefined;
    const type = undefined;
    const state = cwd(initial, { type, payload});
    expect(state).toEqual('/');
    done();
  });

  it('returns initial state if type is not matched', function(done){
    const initial = '/test';
    const type = undefined;
    const state = cwd(initial, { type, payload});
    expect(state).toEqual(initial);
    done();
  });

  describe('returns "action.payload.cwd" when type matches', function(){
    it('CHANGE_DIRECTORY', function(done){
      const initial = '/test';
      const type = CHANGE_DIRECTORY;
      const state = cwd(initial, { type, payload});
      expect(state).toEqual(payload.cwd);
      done();
    });

    it('a valid type even if state is undefined', function(done){
      const initial = undefined;
      const type = CHANGE_DIRECTORY;
      const state = cwd(initial, { type, payload});
      expect(state).toEqual(payload.cwd);
      done();
    });
  });

  it('returns "undefined" if payload is undefined', function(done){
    const initial = '/test';
    const type = CHANGE_DIRECTORY;
    const payload = undefined;
    const state = cwd(initial, { type, payload});
    expect(state).toEqual(undefined);
    done();
  });
});
