'use strict';

const expect = require('expect');
const { filter, includes } = require('lodash');
const { isFSA } = require('flux-standard-action');

const updateAction = require('../update-action');
const { REFRESH_DIRECTORY } = require('../../constants');

describe('updateAction Util', function(){
  const type = REFRESH_DIRECTORY;
  const payload = {};
  const update = {};
  const action = { type, payload };

  it('returns a Flux Standard Action (FSA) object', function(done){
    const updated = updateAction(action, update);
    expect(isFSA(updated)).toEqual(true);
    done();
  });

  it('returns an object with a type that matches the argument action type', function(done){
    const updated = updateAction(action, update);
    expect(updated.type).toEqual(action.type);
    done();
  });

  it('returns an object with a "payload" property that is an object', function(done){
    const updated = updateAction(action, update);
    expect(updated.payload).toBeAn('object');
    done();
  });

  it('returns an object.payload that includes the payload of action argument', function(done){
    const action = {
      type: 'REFRESH_DIRECTORY',
      payload: {
        listing: 'file name'
      }
    };
    const update = { update: 'changed'};
    const updated = updateAction( action, update);
    const actionArgumentProp = Object.keys(action.payload);
    const returnPayloadKeys = Object.keys(updated.payload);
    const verification = filter(actionArgumentProp, function(prop){
      return includes(returnPayloadKeys, prop);
    });
    expect(verification.length).toBe(actionArgumentProp.length);
    done();
  });

  it('returns an object.payload that has at least two properties', function(done){
    const action = {
      type: 'REFRESH_DIRECTORY',
      payload: {
        listing: 'file name'
      }
    };
    const update = { update: 'changed'};
    const updated = updateAction( action, update);
    expect(Object.keys(updated.payload).length).toBeGreaterThan(1);
    done();
  });

  it('returns an object.payload that includes all the properties of the second argument', function(done){
    const action = {
      type: 'REFRESH_DIRECTORY',
      payload: {
        listing: 'file name'
      }
    };
    const update = { update: 'changed'};
    const updated = updateAction( action, update);
    const updateArgumentProp = Object.keys(action.payload);
    const returnPayloadKeys = Object.keys(updated.payload);
    const verification = filter(updateArgumentProp, function(prop){
      return includes(returnPayloadKeys, prop);
    });
    expect(verification.length).toBe(updateArgumentProp.length);
    done();
  });
});
