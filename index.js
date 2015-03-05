'use strict';

var Workspace = require('./lib/workspace');

function frylord(app, opts, cb){

  var namespace = opts.namespace || 'workspace';

  var space = new Workspace();

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
