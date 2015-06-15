'use strict';

const workspaceStore = require('./stores/workspace');
const fileActions = require('./actions/file');
const currentActions = require('./actions/current');
const directoryActions = require('./actions/directory');
const statuses = require('./statuses');

function frylord(app, opts, cb){

  const namespace = opts.namespace || 'workspace';

  workspaceStore.statuses = statuses;

  app.expose(namespace, workspaceStore);
  app.expose('file', fileActions);
  app.expose('current', currentActions);
  app.expose('directory', directoryActions);

  cb();
}

module.exports = frylord;
