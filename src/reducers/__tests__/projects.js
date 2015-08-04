'use strict';

const expect = require('expect');

const projects = require('../projects');

const {
  DELETE_DIRECTORY,
  CHANGE_DIRECTORY
} = require('../../constants');

describe('#projects', function(){
  const payload = {
    projects: [
      'payload1',
      'payload2'
    ]
  };


  describe('returns an empty array when', function(){

    it('type does not match and initial state is undefined', function(done){
      const initial = undefined;
      const type = undefined;
      const state = projects(initial, { type, payload });
      expect(state).toEqual([]);
      done();
    });

    describe('type is matched and action.payload.projects is', function(){

      const initial = 'test';

      it('undefined', function(done){
        const payload = {};
        const type = DELETE_DIRECTORY;
        const state = projects(initial, { type, payload });
        expect(state).toEqual([]);
        done();
      });

      it('null', function(done){
        const payload = { projects: null };
        const type = DELETE_DIRECTORY;
        const state = projects(initial, { type, payload });
        expect(state).toEqual([]);
        done();
      });
    });
  });

  describe('returns action.payload.projects when type matches', function(){

    const initial = 'test';

    it('DELETE_DIRECTORY', function(done){
      const type = DELETE_DIRECTORY;
      const state = projects(initial, { type, payload });
      expect(state).toEqual(payload.projects);
      done();
    });

    it('CHANGE_DIRECTORY', function(done){
      const type = CHANGE_DIRECTORY;
      const state = projects(initial, { type, payload });
      expect(state).toEqual(payload.projects);
      done();
    });
  });

  it('returns initial state when type is undefined', function(done){
    const initial = 'test';
    const type = undefined;
    const state = projects(initial, { type, payload });
    expect(state).toEqual(initial);
    done();
  });
});
