'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

lab.experiment.skip('TempWorkspace', function(){

  lab.test('#saveFile will clear the temp file if contents match', function(done){

  });

  lab.test('#saveFile also handles cursors to check against temp files', function(done){

  });

  lab.test('#saveFile sets temp to false on updated file', function(done){

  });

  lab.test('#updateContent will update a temp file if content is different', function(done){

  });

  lab.test('#updateContent does not create a temp file if no filename', function(done){

  });

  lab.test('#loadFile will load a temp file into current if it exists', function(done){

  });

  lab.test('#loadFile will load a regular file into current if temp does not exist', function(done){

  });

  lab.test('#loadFile will load a temp file based on cwd', function(done){

  });

  lab.test('#changeDir should adjust cwd and add files to directory structure', function(done){

  });

  lab.experiment('#deleteFile', function(){

    lab.test('cleans up the temp file that exists & removes from directory structure', function(done){

    });

    lab.test('accepts a cursor for filepath', function(done){

    });
  });
});
