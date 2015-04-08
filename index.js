'use strict';

var Workspace = require('./lib/workspace');
var TempWorkspace = require('./lib/temp-workspace');

function frylord(app, opts, cb){

  var namespace = opts.namespace || 'workspace';

  var space;
  if(opts.useTempFiles){
    space = new TempWorkspace();
  } else {
    space = new Workspace();
  }

  app.expose(namespace, space);

  // TODO: make workspace an EE?
  space._structure.on('swap', function(){
    // allow initial setup without render
    if(app._renderCalled){
      app.render();
    }
  });

  cb();
}

module.exports = frylord;
