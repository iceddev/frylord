'use strict';

const _ = require('lodash');

const actions = require('./actions');
const createStore = require('./create-store');
const tempMiddleware = require('./middleware/temp');

// Easily export constants
const ACTION_CONSTANTS = require('./constants');
const STATUS_CONSTANTS = require('./status-constants');

function frylord(app, opts, cb){

  const namespace = opts.namespace || 'workspace';

  const middleware = (opts.useTempFiles ? tempMiddleware : []);
  const store = createStore(middleware);

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
