'use strict';

var fs = require('fs');

var lab = exports.lab = require('lab').script();
var code = require('code');

var Workspace = require('../lib/workspace');
var helpers = require('../lib/helpers');

lab.experiment('Workspace', function(){

  var space;
  var tmpFilepath = '.tmp/test.js';

  lab.beforeEach(function(done){
    space = new Workspace();
    done();
  });

  lab.test('#filename is a cursor for the current filename', function(done){
    code.expect(space.filename.deref).to.be.a.function();
    code.expect(space.filename.deref()).to.equal('');
    done();
  });

  lab.test('#filename allows updating current filename through update', function(done){
    var newFilename = 'test.js';

    code.expect(space.filename.update).to.be.a.function();

    space.filename.update(function(){
      return newFilename;
    });

    code.expect(space.filename.deref()).to.equal(newFilename);
    done();
  });

  lab.test('#current is a cursor for current file', function(done){
    code.expect(space.current.deref).to.be.a.function();
    code.expect(space.current.deref()).to.equal('function helloWorld(hello){\n  hello = "world";\n}');
    done();
  });

  lab.test('#current allows updating current data through .update', function(done){
    var newText = 'function helloWorld(hello){\n  foo = "bar";\n}';

    code.expect(space.current.update).to.be.a.function();

    space.current.update(function(){
      return newText;
    });

    code.expect(space.current.deref()).to.equal(newText);
    done();
  });

  lab.test('#cwd is a cursor for the current working directory', function(done){
    // TODO: root differs between browser and node
    code.expect(space.cwd.deref).to.be.a.function();
    code.expect(space.cwd.deref()).to.equal('./');
    done();
  });

  lab.test('#directory should default to an empty list', function(done){
    code.expect(space.directory.deref).to.be.a.function();
    code.expect(space.directory.size).to.equal(0);
    done();
  });

  lab.test('#projects should default to an empty list', function(done){
    code.expect(space.projects.deref).to.be.a.function();
    code.expect(space.projects.size).to.equal(0);
    done();
  });

  lab.test('#updateContent can be used to update the current cursor', function(done){
    var newText = 'function helloWorld(hello){\n  foo = "bar";\n}';
    space.updateContent(newText, function(err, content){
      code.expect(err).to.not.exist();
      code.expect(content.deref()).to.equal(newText);
      code.expect(content).to.equal(space.current);
      done(err);
    });
  });

  lab.test('#saveFile will mkdirp and save a file', function(done){
    var newText = 'function helloWorld(hello){\n  foo = "bar";\n}';

    space.saveFile(tmpFilepath, newText, function(err){
      var saved = fs.readFileSync(tmpFilepath, 'utf8');

      code.expect(err).to.not.exist();
      code.expect(saved).to.equal(newText);
      done(err);
    });
  });

  lab.test('#saveFile also handles cursors', function(done){
    var newText = 'function helloWorld(hello){\n  my = "cursor";\n}';

    space.current.update(function(){
      return newText;
    });

    space.saveFile(tmpFilepath, space.current, function(err){
      var saved = fs.readFileSync(tmpFilepath, 'utf8');

      code.expect(err).to.not.exist();
      code.expect(saved).to.equal(newText);
      done(err);
    });
  });

  lab.test('#saveFile does not add the file to the directory listing if cwd === root', function(done){
    var newText = 'function helloWorld(hello){\n  foo = "bar";\n}';
    var filename = tmpFilepath.replace('.tmp/', '');

    space.saveFile(tmpFilepath, newText, function(err){
      code.expect(err).to.not.exist();
      code.expect(helpers.containsFile(space.directory, filename)).to.equal(false);
      done(err);
    });
  });

  lab.test('#saveFile does not add the file to the directory listing twice upon 2nd save', function(done){
    var newText = 'function helloWorld(hello){\n  foo = "bar";\n}';

    space.saveFile(tmpFilepath, newText, function(err){
      code.expect(err).to.not.exist();
      space.saveFile(tmpFilepath, newText, function(err2){
        code.expect(err2).to.not.exist();
        code.expect(space.directory.indexOf(tmpFilepath)).to.equal(space.directory.lastIndexOf(tmpFilepath));
        done(err2);
      });
    });
  });

  lab.test('#saveFile can take workspace.current', function(done){
    space.saveFile(tmpFilepath, space.current, function(err){
      var saved = fs.readFileSync(tmpFilepath, 'utf8');

      code.expect(err).to.not.exist();
      code.expect(space.current.deref()).to.equal(saved);
      done(err);
    });
  });

  lab.test('#loadFile will load a file into current', function(done){
    space.loadFile(tmpFilepath, function(err, contents){
      code.expect(err).to.not.exist();
      code.expect(contents).to.equal(space.current);
      done();
    });
  });

  lab.test('#loadFile will load a file based on cwd', function(done){
    space.changeDir('.tmp', function(){
      var filename = tmpFilepath.replace('.tmp/', '');
      space.loadFile(filename, function(err, contents){
        code.expect(err).to.not.exist();
        code.expect(contents).to.equal(space.current);
        code.expect(space.filename.deref()).to.equal(filename);
        done();
      });
    });
  });

  lab.test('#changeDir should adjust cwd and add files to directory structure', function(done){
    space.changeDir('.tmp', function(err, files){
      code.expect(err).to.not.exist();
      code.expect(space.directory).to.equal(files);
      code.expect(files.size).to.equal(1);
      done(err);
    });
  });

  lab.test('#changeDir should add projects from the root to the projects cursor', function(done){
    space.changeDir('.tmp', function(err){
      code.expect(err).to.not.exist();
      code.expect(space.projects.contains('.tmp')).to.equal(true);
      done(err);
    });
  });

  lab.experiment('#deleteFile', function(){

    var text = 'function helloWorld(hello){\n  hello = "world";\n}';

    // sub-experiment to create files
    lab.beforeEach(function(done){
      fs.writeFile(tmpFilepath, text, 'utf8', done);
    });

    lab.test('deletes a file that exists & removes from directory structure', function(done){
      space.changeDir('.tmp', function(){
        var filename = tmpFilepath.replace('.tmp/', '');

        code.expect(helpers.containsFile(space.directory, filename)).to.equal(true);

        space.deleteFile(filename, function(err){
          code.expect(err).to.not.exist();

          var exists = fs.existsSync(tmpFilepath);

          code.expect(exists).to.equal(false);
          code.expect(space.filename.deref()).to.equal('');
          code.expect(space.current.deref()).to.equal('');
          code.expect(helpers.containsFile(space.directory, filename)).to.equal(false);
          done(err);
        });
      });
    });

    lab.test('accepts a cursor for filepath', function(done){
      space.filename.update(function(){
        return tmpFilepath.replace('.tmp/', '');
      });

      space.changeDir('.tmp', function(){
        code.expect(helpers.containsFile(space.directory, space.filename)).to.equal(true);

        space.deleteFile(space.filename, function(err){
          code.expect(err).to.not.exist();

          var exists = fs.existsSync(tmpFilepath);

          code.expect(exists).to.equal(false);
          code.expect(space.filename.deref()).to.equal('');
          code.expect(space.current.deref()).to.equal('');
          code.expect(helpers.containsFile(space.directory, space.filename)).to.equal(false);
          done(err);
        });
      });
    });
  });

  lab.experiment('#deleteDir', function(){

    var dirname = '.tmpDir';

    lab.beforeEach(function(done){
      space.changeDir(dirname, done);
    });

    lab.test('deletes directory & removes from project structure', function(done){

      code.expect(space.projects.contains(dirname)).to.equal(true);

      space.deleteDir(dirname, function(err){
        code.expect(err).to.not.exist();

        var exists = fs.existsSync(dirname);

        code.expect(exists).to.equal(false);
        code.expect(space.projects.contains(dirname)).to.equal(false);
        done(err);
      });
    });

    lab.test('accepts a cursor for path', function(done){
      space.cwd.update(function(){
        return dirname;
      });

      code.expect(space.projects.contains(dirname)).to.equal(true);

      space.deleteDir(space.cwd, function(err){
        code.expect(err).to.not.exist();

        var exists = fs.existsSync(dirname);

        code.expect(exists).to.equal(false);
        code.expect(space.projects.contains(dirname)).to.equal(false);
        done(err);
      });
    });
  });
});
