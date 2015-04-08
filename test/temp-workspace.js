'use strict';

var fs = require('fs');

var lab = exports.lab = require('lab').script();
var code = require('code');

var TempWorkspace = require('../lib/temp-workspace');
var helpers = require('../lib/helpers');

lab.experiment('TempWorkspace', function(){

  var space;
  var filepath = '.tmp/test.js';
  var tmpFilepath = helpers.normalizePath(helpers.root, filepath);

  lab.beforeEach(function(done){
    space = new TempWorkspace();
    helpers.temp.put(tmpFilepath, 'test', done);
  });

  lab.afterEach(function(done){
    helpers.temp.del(tmpFilepath, done);
  });

  lab.test('#saveFile will clear the temp file if contents match', function(done){
    var newText = 'function helloWorld(hello){\n  foo = "bar";\n}';

    space.saveFile(filepath, newText, function(saveErr){
      code.expect(saveErr).to.not.exist();

      helpers.temp.get(tmpFilepath, function(err){
        code.expect(err).to.exist();
        code.expect(err.notFound).to.equal(true);
        done();
      });
    });
  });

  lab.test('#saveFile also handles cursors to check against temp files', function(done){
    var newText = 'function helloWorld(hello){\n  my = "cursor";\n}';

    space.current.update(function(){
      return newText;
    });

    space.saveFile(tmpFilepath, space.current, function(saveErr){
      code.expect(saveErr).to.not.exist();

      helpers.temp.get(tmpFilepath, function(err){
        code.expect(err).to.exist();
        code.expect(err.notFound).to.equal(true);
        done();
      });
    });
  });

  lab.test('#saveFile sets temp to false on updated file', function(done){
    var newText = 'function helloWorld(hello){\n  foo = "bar";\n}';
    var filename = filepath.replace('.tmp/', '');

    space.cwd.update(function(){
      return '.tmp/';
    });

    space.saveFile(filename, newText, function(err){
      code.expect(err).to.not.exist();
      code.expect(space.directory.get(0).toJS()).to.deep.equal({ name: filename, temp: false });
      done(err);
    });
  });

  lab.test('#updateContent will update a temp file if content is different', function(done){
    var newText = 'new text';

    space.cwd.update(function(){
      return '.tmp/';
    });

    space.filename.update(function(){
      return filepath.replace('.tmp/', '');
    });

    space.updateContent(newText, function(updateErr){
      code.expect(updateErr).to.not.exist();

      helpers.temp.get(tmpFilepath, function(err, content){
        code.expect(err).to.not.exist();
        code.expect(content).to.equal(newText);
        code.expect(space.current.deref()).to.equal(content);
        done(err);
      });
    });
  });

  lab.test('#updateContent does not create a temp file if cwd is root', function(done){
    var newText = 'new text';

    space.filename.update(function(){
      return filepath;
    });

    space.updateContent(newText, function(updateErr){
      code.expect(updateErr).to.not.exist();

      helpers.temp.get(tmpFilepath, function(err, content){
        code.expect(err).to.not.exist();
        code.expect(content).to.not.equal(newText);
        code.expect(space.current.deref()).to.not.equal(content);
        done(err);
      });
    });
  });

  lab.test('#loadFile will load a temp file into current if it exists', function(done){
    space.loadFile(filepath, function(err, contents){
      code.expect(err).to.not.exist();
      code.expect(contents.deref()).to.equal('test');
      code.expect(contents).to.equal(space.current);
      done();
    });
  });

  lab.test('#loadFile will load a regular file into current if temp does not exist', function(done){
    helpers.temp.del(tmpFilepath, function(){
      space.loadFile(filepath, function(err, contents){
        code.expect(err).to.not.exist();
        code.expect(contents).to.equal(space.current);
        done();
      });
    });
  });

  lab.test('#loadFile will load a temp file based on cwd', function(done){
    space.changeDir('.tmp', function(){
      var filename = filepath.replace('.tmp/', '');
      space.loadFile(filename, function(err, contents){
        code.expect(err).to.not.exist();
        code.expect(contents.deref()).to.equal('test');
        code.expect(contents).to.equal(space.current);
        code.expect(space.filename.deref()).to.equal(filename);
        done();
      });
    });
  });

  lab.test('#changeDir should adjust cwd and add files to directory structure', function(done){
    space.changeDir('.tmp', function(err, files){
      var filename = files.get('0').get('name');
      code.expect(err).to.not.exist();
      code.expect(space.directory.get(0).toJS()).to.deep.equal({ name: filename, temp: true });
      code.expect(files.size).to.equal(1);
      done(err);
    });
  });

  lab.experiment('#deleteFile', function(){

    var text = 'function helloWorld(hello){\n  hello = "world";\n}';

    // sub-experiment to create files
    lab.beforeEach(function(done){
      fs.writeFile(filepath, text, 'utf8', done);
    });

    lab.test('cleans up the temp file that exists & removes from directory structure', function(done){
      var filename = filepath.replace('.tmp/', '');

      space.cwd.update(function(){
        return '.tmp/';
      });

      space.deleteFile(filename, function(deleteErr){
        code.expect(deleteErr).to.not.exist();

        helpers.temp.get(tmpFilepath, function(err){
          code.expect(err).to.exist();
          code.expect(err.notFound).to.equal(true);
          code.expect(helpers.containsFile(space.directory, filename)).to.equal(false);
          done();
        });
      });
    });

    lab.test('accepts a cursor for filepath', function(done){
      space.filename.update(function(){
        return filepath.replace('.tmp/', '');
      });

      space.cwd.update(function(){
        return '.tmp/';
      });

      space.deleteFile(space.filename, function(deleteErr){
        code.expect(deleteErr).to.not.exist();

        helpers.temp.get(tmpFilepath, function(err){
          code.expect(err).to.exist();
          code.expect(err.notFound).to.equal(true);
          code.expect(helpers.containsFile(space.directory, space.filename)).to.equal(false);
          done();
        });
      });
    });
  });
});
