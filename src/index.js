'use strict';

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

  function readFile(...args){
    return store.dispatch(actions.readFile(...args));
  }

  function writeFile(...args){
    return store.dispatch(actions.writeFile(...args));
  }

  function changeFile(...args){
    return store.dispatch(actions.changeFile(...args));
  }

  app.expose(namespace, {
    store,
    readFile,
    writeFile,
    changeFile
  });

  cb();
}

module.exports = frylord;
