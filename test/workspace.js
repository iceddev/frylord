'use strict';

var expect = require('expect');

describe('Workspace', function(){

  it('#filename is a cursor for the current filename', function(done){
    done();
  });

  it('#filename allows updating current filename through update', function(done){
    done();
  });

  it('#current is a cursor for current file', function(done){
    done();
  });

  it('#current allows updating current data through .update', function(done){
    done();
  });

  it('#cwd is a cursor for the current working directory', function(done){
    done();
  });

  it('#directory should default to an empty list', function(done){
    done();
  });

  it('#projects should default to an empty list', function(done){
    done();
  });

  it('#updateContent can be used to update the current cursor', function(done){
    done();
  });

  it('#saveFile will mkdirp and save a file', function(done){
    done();
  });

  it('#saveFile also handles cursors', function(done){
    done();
  });

  it('#saveFile does not add the file to the directory listing if cwd === root', function(done){
    done();
  });

  it('#saveFile does not add the file to the directory listing twice upon 2nd save', function(done){
    done();
  });

  it('#saveFile can take workspace.current', function(done){
    done();
  });

  it('#loadFile will load a file into current', function(done){
    done();
  });

  it('#loadFile will load a file based on cwd', function(done){
    done();
  });

  it('#changeDir should adjust cwd and add files to directory structure', function(done){
    done();
  });

  it('#changeDir should add projects from the root to the projects cursor', function(done){
    done();
  });

  describe('#deleteFile', function(){

    it('deletes a file that exists & removes from directory structure', function(done){
      done();
    });

    it('accepts a cursor for filepath', function(done){
      done();
    });
  });

  describe('#deleteDir', function(){

    it('deletes directory & removes from project structure', function(done){
      done();
    });

    it('accepts a cursor for path', function(done){
      done();
    });
  });
});
