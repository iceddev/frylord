'use strict';

var fs = require('fs');

var lab = exports.lab = require('lab').script();
var code = require('code');

lab.experiment.skip('Workspace', function(){

  lab.test('#filename is a cursor for the current filename', function(done){
    done();
  });

  lab.test('#filename allows updating current filename through update', function(done){
    done();
  });

  lab.test('#current is a cursor for current file', function(done){
    done();
  });

  lab.test('#current allows updating current data through .update', function(done){
    done();
  });

  lab.test('#cwd is a cursor for the current working directory', function(done){
    done();
  });

  lab.test('#directory should default to an empty list', function(done){
    done();
  });

  lab.test('#projects should default to an empty list', function(done){
    done();
  });

  lab.test('#updateContent can be used to update the current cursor', function(done){

  });

  lab.test('#saveFile will mkdirp and save a file', function(done){

  });

  lab.test('#saveFile also handles cursors', function(done){

  });

  lab.test('#saveFile does not add the file to the directory listing if cwd === root', function(done){

  });

  lab.test('#saveFile does not add the file to the directory listing twice upon 2nd save', function(done){

  });

  lab.test('#saveFile can take workspace.current', function(done){

  });

  lab.test('#loadFile will load a file into current', function(done){

  });

  lab.test('#loadFile will load a file based on cwd', function(done){

  });

  lab.test('#changeDir should adjust cwd and add files to directory structure', function(done){

  });

  lab.test('#changeDir should add projects from the root to the projects cursor', function(done){

  });

  lab.experiment('#deleteFile', function(){

    lab.test('deletes a file that exists & removes from directory structure', function(done){

    });

    lab.test('accepts a cursor for filepath', function(done){

    });
  });

  lab.experiment('#deleteDir', function(){

    lab.test('deletes directory & removes from project structure', function(done){

    });

    lab.test('accepts a cursor for path', function(done){

    });
  });
});
