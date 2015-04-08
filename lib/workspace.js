'use strict';

var when = require('when');
var nodefn = require('when/node');
var fs = nodefn.liftAll(require('fs-extra'));
var Immstruct = require('immstruct').Immstruct;

var helpers = require('./helpers');

function Workspace(){
  var self = this;

  var inst = this._inst = new Immstruct();

  var structure = this._structure = inst.get({
    filename: '',
    current: 'function helloWorld(hello){\n  hello = "world";\n}',
    cwd: helpers.root,
    directory: [],
    projects: []
  });

  this.filename = structure.cursor('filename');
  this.current = structure.cursor('current');
  this.cwd = structure.cursor('cwd');
  this.directory = structure.cursor('directory');
  this.projects = structure.cursor('projects');

  structure.on('swap', function(n, o, updatedPath){
    if(updatedPath.indexOf('filename') === 0){
      self.filename = structure.cursor('filename');
      return;
    }

    if(updatedPath.indexOf('current') === 0){
      self.current = structure.cursor('current');
      return;
    }

    if(updatedPath.indexOf('cwd') === 0){
      self.cwd = structure.cursor('cwd');
      return;
    }

    if(updatedPath.indexOf('directory') === 0){
      self.directory = structure.cursor('directory');
      return;
    }

    // no coverage on the last one because reaching here is the default
    if(updatedPath.indexOf('projects') === 0){
      self.projects = structure.cursor('projects');
      return;
    }
  });
}

Workspace.prototype._resolveToCwd = function(filepath){
  return helpers.normalizePath(this.cwd.deref(), filepath);
};

Workspace.prototype._resolveToRoot = function(filepath){
  return helpers.normalizePath(helpers.root, filepath);
};

Workspace.prototype.updateContent = function(content, cb){
  var self = this;

  var promise = when.promise(function(resolve){
    self.current.update(function(){
      return content;
    });

    resolve(self.current);
  });

  return nodefn.bindCallback(promise, cb);
};

Workspace.prototype.loadFile = function loadFile(filepath, cb){
  var self = this;

  var resolvedFilepath = this._resolveToCwd(filepath);

  var promise = fs.readFile(resolvedFilepath, 'utf8')
    .then(function(contents){
      self.filename.update(function(){
        return filepath;
      });
      self.current.update(function(){
        return contents;
      });

      return self.current;
    });

  return nodefn.bindCallback(promise, cb);
};

Workspace.prototype.saveFile = function saveFile(filepath, content, cb){
  var self = this;
  // TODO: make sure all arguments are passed

  if(typeof content.deref === 'function'){
    content = content.deref();
  }

  var resolvedFilepath = this._resolveToCwd(filepath);

  var promise = fs.outputFile(resolvedFilepath, content)
    .then(function(){
      var notRoot = self.cwd.deref() !== helpers.root;
      var doesntContain = !helpers.containsFile(self.directory, filepath);
      // don't update a directory at root
      // currently not supported
      if(notRoot && doesntContain){
        return helpers.createFiles([filepath], { cwd: self.cwd.deref() });
      } else {
        return [];
      }
    })
    .then(function(files){
      self.directory.update(function(list){
        return list.concat(files);
      });
    });

  return nodefn.bindCallback(promise, cb);
};

Workspace.prototype.deleteFile = function deleteFile(filepath, cb){
  if(typeof filepath.deref === 'function'){
    filepath = filepath.deref();
  }

  var filename = this.filename;
  var current = this.current;
  var directory = this.directory;

  var resolvedFilepath = this._resolveToCwd(filepath);

  var promise = fs.delete(resolvedFilepath)
    .then(function(){
      filename.update(function(){
        return '';
      });

      current.update(function(){
        return '';
      });

      directory.update(function(list){
        return list.filter(function(file){
          return file.get('name') !== filepath;
        });
      });
    });

  return nodefn.bindCallback(promise, cb);
};

Workspace.prototype.changeDir = function changeDir(dirpath, cb){
  var self = this;
  var cwd = this.cwd;
  var directory = this.directory;
  var projects = this.projects;

  // TODO: support more than root resolution
  var resolvedDir = this._resolveToRoot(dirpath);

  var promise = fs.ensureDir(resolvedDir)
    .then(function(){
      return fs.readdir(helpers.root);
    })
    .tap(function(directories){
      projects.update(function(list){
        var empty = list.clear();
        return empty.concat(directories);
      });
    })
    .then(function(){
      return fs.readdir(resolvedDir);
    })
    .then(function(filenames){
      return helpers.createFiles(filenames, { cwd: resolvedDir });
    })
    .then(function(files){
      cwd.update(function(){
        return resolvedDir;
      });

      directory.update(function(list){
        var empty = list.clear();
        return empty.concat(files);
      });

      return self.directory;
    });

  return nodefn.bindCallback(promise, cb);
};

Workspace.prototype.deleteDir = function deleteDir(dirpath, cb){
  if(typeof dirpath.deref === 'function'){
    dirpath = dirpath.deref();
  }

  var projects = this.projects;
  // TODO: support more than root resolution
  var resolvedDir = this._resolveToRoot(dirpath);

  var promise = fs.delete(resolvedDir)
    .tap(function(){
      projects.update(function(list){
        return list.filter(function(project){
          return project !== dirpath;
        });
      });
    });

  return nodefn.bindCallback(promise, cb);
};

module.exports = Workspace;
