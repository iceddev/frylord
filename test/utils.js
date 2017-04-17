'use strict';

var _ = require('lodash');
var expect = require('expect');

var notFound = require('../utils/not-found');
var refreshDirectoryAction = require('../utils/refresh-directory-action');
var updateAction = require('../utils/update-action');


describe('Util', function(){

  it('#notFound should throw an error with a "notFound" property', function(done){
    var err = new Error();
    expect(notFound(err)).toThrow(err.notFound);
    done();
  });

  describe('#refreshDirectoryAction', function(){
    var ref, action;

    beforeEach(function(){
      ref = {
        listing: 'item one',
        two: 'item two'
      };

      action = refreshDirectoryAction(ref);
    });

    afterEach(function(){
      ref = null;
      action = null;
    });

    it('returns an object', function(done){
      expect(action).toBeAn('object');
      done();
    });

    it('has a "type" property that matches "REFRESH_DIRECTORY"', function(done){
      var type = 'REFRESH_DIRECTORY';

      expect(action.type).toExist()
      .toBeA('string')
      .toMatch(new RegExp(type));
      done();
    });

    it('extracts "listing" from argument and returns it in payload.listing', function(done){
      expect(refreshDirectoryAction(ref).payload.listing)
      .toExist()
      .toEqual(ref.listing);
      done();
    });
  });

  describe('#updateAction', function(){
    var directoryAction, payload, update, updated, badArg;

    before(function(){
      payload = {
        listing: 'file name'
      };
      badArg = {
        notType: 'hahaha',
        notPayload: 'this should error'
      };
    });

    beforeEach(function(){
      directoryAction = {
        type: 'REFRESH_DIRECTORY',
        payload: payload
      };
      update = { update: ' changed'};
      updated = updateAction(directoryAction, update);
    });

    after(function(){
      payload = null;
      badArg = null;
    });

    afterEach(function(){
      directoryAction = null;
      update = null;
    });

    it('returns an object with "type" and "payload" properties', function(done){
      expect(updated.type).toExist();
      expect(updated.payload).toExist();
      done();
    });

    it('has a type that is equal to the "type" property of the first argument', function(done){
      var type = directoryAction.type;
      expect(updated.type).toEqual(type);
      done();
    });

    it('has a payload that is an object', function(done){
      expect(updated.payload).toBeAn('object');
      done();
    });

    it('returns an object.payload that includes the payload of first argument', function(done){
      var firstArgumentProp = Object.keys(directoryAction.payload);
      var returnPayloadKeys = Object.keys(updated.payload);
      var verification = _.filter(firstArgumentProp, function(prop){
        return _.includes(returnPayloadKeys, prop);
      });
      expect(verification.length).toBe(firstArgumentProp.length);
      done();
    });

    it('returns an object.payload that has at least two properties', function(done){
      expect(Object.keys(updated.payload).length).toBeGreaterThan(1);
      done();
    });

    it('returns an object.payload that includes all the properties of the second argument', function(done){
      var secondArgumentKeys = Object.keys(update);
      var returnPayloadKeys = Object.keys(updated.payload);
      var verification = _.filter(secondArgumentKeys, function(propName){
        return _.includes(returnPayloadKeys, propName);
      });
      expect(verification.length).toBe(secondArgumentKeys.length);
      done();
    });

    it.skip('throws an error if first argument does not have "type" and "payload"', function(done){
      expect(function() {
        return updateAction(badArg, update);
      }).toThrow(/invalid arguments/);
      done();
    });
  });

});
