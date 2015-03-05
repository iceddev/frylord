'use strict';

var Workspace = require('./lib/workspace');

function frylord(app, opts, cb){

  var namespace = opts.namespace || 'workspace';

  app.expose(namespace, new Workspace());

  cb();
}

module.exports = frylord;
