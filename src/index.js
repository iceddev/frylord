'use strict';

const _ = require('lodash');

const actions = require('./actions');
const createStore = require('./create-store');

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

  app.expose(namespace, _.assign({ getState, subscribe }, api));

  cb();
}

module.exports = frylord;
