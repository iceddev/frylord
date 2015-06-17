'use strict';

var util = require('util');

var when = require('when');
var nodefn = require('when/node');
var fs = nodefn.liftAll(require('fs-extra'));

var Workspace = require('./workspace');
var helpers = require('./helpers');
var temp = helpers.temp;

function TempWorkspace(){
  Workspace.call(this);
}
util.inherits(TempWorkspace, Workspace);

TempWorkspace.prototype.updateContent = function(content, cb){
  var self = this;

  var filename = this.filename.deref();

  var update = Workspace.prototype.updateContent.call(self, content);

  var promise = update;

  if(filename){
    promise = update.tap(function(){
      return self._updateTemp(self.filename, content);
    })
    .tap(function(){
      return self._updateDirectory();
    });
  }

  return nodefn.bindCallback(promise, cb);
};

TempWorkspace.prototype.loadFile = function(filepath, cb){
  var self = this;

  var resolvedFilepath = this._resolveToCwd(filepath);

  var promise = temp.get(resolvedFilepath)
    // if found, set the temp as current and return
    .then(function(contents){
      // TODO: dedupe with Workspace
      self.filename.update(function(){
        return filepath;
      });
      self.current.update(function(){
        return contents;
      });

      return self.current;
    })
    // if not found, defer to original
    .catch(temp.notFound, function(){
      return Workspace.prototype.loadFile.call(self, filepath);
    });

  return nodefn.bindCallback(promise, cb);
};

TempWorkspace.prototype.saveFile = function(filepath, content, cb){
  var self = this;

  var promise = Workspace.prototype.saveFile.call(self, filepath, content)
    .tap(function(){
      return self._updateTemp(filepath, content);
    })
    .tap(function(){
      return self._updateDirectory();
    });

  return nodefn.bindCallback(promise, cb);
};

TempWorkspace.prototype.deleteFile = function(filepath, cb){
  var self = this;

  if(typeof filepath.deref === 'function'){
    filepath = filepath.deref();
  }

  var resolvedFilepath = this._resolveToCwd(filepath);

  var promise = Workspace.prototype.deleteFile.call(self, filepath)
    .tap(function(){
      return temp.del(resolvedFilepath);
    })
    .tap(function(){
      return self._updateDirectory();
    });

  return nodefn.bindCallback(promise, cb);
};

TempWorkspace.prototype.changeDir = function(dirpath, cb){
  var self = this;

  var promise = Workspace.prototype.changeDir.call(self, dirpath)
    .tap(function(){
      return self._updateDirectory();
    });

  return nodefn.bindCallback(promise, cb);
};

// internal methods don't need to accept callbacks
TempWorkspace.prototype._updateTemp = function(filepath, content){
  if(typeof filepath.deref === 'function'){
    filepath = filepath.deref();
  }

  if(typeof content.deref === 'function'){
    content = content.deref();
  }

  var resolvedFilepath = this._resolveToCwd(filepath);

  var promise = fs.readFile(resolvedFilepath, 'utf8')
    .then(function(fileContents){
      if(content === fileContents){
        return temp.del(resolvedFilepath);
      } else {
        return temp.put(resolvedFilepath, content);
      }
    })
    .otherwise(function(){
      return temp.put(resolvedFilepath, content);
    });

  return promise;
};

// internal methods don't need to accept callbacks
TempWorkspace.prototype._updateDirectory = function(){
  var cwd = this.cwd.deref();
  var directory = this.directory;

  // don't update a directory at root
  // currently not supported
  if(cwd === helpers.root){
    return when.resolve();
  }

  var resolvedDir = this._resolveToRoot(cwd);

  var promise = fs.readdir(resolvedDir)
    .then(function(filenames){
      return helpers.createFiles(filenames, { cwd: cwd, checkTemp: true });
    })
    .tap(function(files){
      directory.update(function(list){
        var empty = list.clear();
        return empty.concat(files);
      });
    });

  return promise;
};

module.exports = TempWorkspace;
