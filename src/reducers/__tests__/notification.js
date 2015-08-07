'use strict';

var expect = require('expect');

var notification = require('../notification');
const {
  ERROR,
  SAVE_FILE,
  DELETE_FILE,
  CHANGE_FILE,
  DELETE_DIRECTORY,
  CHANGE_DIRECTORY
} = require('../../constants');

describe('#notifcation', function(){
  const payload = {
      notification: 'some notification'
    };

  describe('returns an empty string', function(){
    it('when type is not matched and initial state is undefined', function(done){
      const initial = undefined;
      const type = undefined;
      const state = notification(initial, { type, payload });
      expect(state).toEqual('');
      done();
    });

    it('when type is not matched', function(done){
      const initial = 'test';
      const type = undefined;
      const state = notification(initial, { type, payload });
      expect(state).toEqual('');
      done();
    });
  });


  describe('returns action.payload.notification when type matches', function(){
    const initial = 'test';

    it('ERROR', function(done){
      const type = ERROR;
      const state = notification(initial, { type, payload });
      expect(state).toEqual(payload.notification);
      done();
    });

    it('SAVE_FILE', function(done){
      const type = SAVE_FILE;
      const state = notification(initial, { type, payload });
      expect(state).toEqual(payload.notification);
      done();
    });

    it('DELETE_FILE', function(done){
      const type = DELETE_FILE;
      const state = notification(initial, { type, payload });
      expect(state).toEqual(payload.notification);
      done();
    });

    it('CHANGE_FILE', function(done){
      const type = CHANGE_FILE;
      const state = notification(initial, { type, payload });
      expect(state).toEqual(payload.notification);
      done();
    });

    it('DELETE_DIRECTORY', function(done){
      const type = DELETE_DIRECTORY;
      const state = notification(initial, { type, payload });
      expect(state).toEqual(payload.notification);
      done();
    });

    it('CHANGE_DIRECTORY', function(done){
      const type = CHANGE_DIRECTORY;
      const state = notification(initial, { type, payload });
      expect(state).toEqual(payload.notification);
      done();
    });
  });

  describe('returns an empty string if action.payload.notification is', function(){
    const initial = 'test';

    it('undefined', function(done){
      const payload = {};
      const type = CHANGE_DIRECTORY;
      const state = notification(initial, { type, payload });
      expect(state).toEqual('');
      done();
    });

    it('null', function(done){
      const payload = { notification: null };
      const type = CHANGE_DIRECTORY;
      const state = notification(initial, { type, payload });
      expect(state).toEqual('');
      done();
    });
  });
});


