'use strict';

var _ = require('lodash');
var expect = require('expect');
var isFSA = require('flux-standard-action').isFSA;

var notFound = require('../utils/not-found');
var refreshDirectoryAction = require('../utils/refresh-directory-action');
var updateAction = require('../utils/update-action');


describe('Util', function(){

  describe('#notFound', function(){
    var err;

    beforeEach(function(){
      err = new Error();
    });

    afterEach(function(){
      err = null;
    });

    it('should return true with the presence of "notFound" property', function(done){
      err.notFound = true;
      expect(notFound(err)).toBe(true);
      done();
    });

    it('should return "false" when the err.notFound is "undefined" or "null"', function(done){
      expect(notFound(err)).toNotExist('err.notFound is undefined and should be falsy');
      err.notFound = null;
      expect(notFound(err)).toNotExist('err.notFound is null and should be falsy');
      done();
    });

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

    it('returns a Flux Standard Action (FSA) object', function(done){
      expect(isFSA(action)).toBe(true, 'this should conform with Flux Standard Action specification');
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

    it('returns a Flux Standard Action (FSA) object', function(done){
      expect(isFSA(updated)).toBe(true);
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
