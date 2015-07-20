'use strict';

const _ = require('lodash');

const actions = require('./actions');
const createStore = require('./create-store');

// Easily export constants
const ACTION_CONSTANTS = require('./constants');
const STATUS_CONSTANTS = require('./status-constants');

function frylord(app, opts, cb){

  const namespace = opts.namespace || 'workspace';
  const store = createStore();

  // var space;
  // if(opts.useTempFiles){
  //   space = new TempWorkspace();
  // } else {
  //   space = new Workspace();
  // }

  function getState(){
    return store.getState();
  }

  function subscribe(...args){
    return store.subscribe(...args);
  }

  const api = _.mapValues(actions, (method) => {
    return (...args) => store.dispatch(method(...args));
  });

  const exported = _.assign({
    getState,
    subscribe,
    STATUS_CONSTANTS,
    ACTION_CONSTANTS
  }, api);

  app.expose(namespace, exported);

  cb();
}

module.exports = frylord;
