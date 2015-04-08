'use strict';

var path = require('path');

var when = require('when');
var nodefn = require('when/node');
var levelup = require('levelup');
var memdown = require('memdown');
var immutable = require('immutable');

var db = levelup('temp-files', {
  db: memdown,
  valueEncoding: 'json'
});

var root = process.browser ? '/' : './';

function tempGet(key, opts, cb){
  if(typeof opts === 'function'){
    cb = opts;
    opts = null;
  }

  var promise = when.promise(function(resolve, reject){
    db.get(key, opts, function(err, result){
      if(err){
        return reject(err);
      }

      resolve(result);
    });
  });

  return nodefn.bindCallback(promise, cb);
}

function tempPut(key, value, opts, cb){
  if(typeof opts === 'function'){
    cb = opts;
    opts = null;
  }

  var promise = when.promise(function(resolve, reject){
    db.put(key, value, opts, function(err, result){
      if(err){
        return reject(err);
      }

      resolve(result);
    });
  });

  return nodefn.bindCallback(promise, cb);
}

function tempDel(key, opts, cb){
  if(typeof opts === 'function'){
    cb = opts;
    opts = null;
  }

  var promise = when.promise(function(resolve, reject){
    db.del(key, opts, function(err, result){
      if(err){
        return reject(err);
      }

      resolve(result);
    });
  });

  return nodefn.bindCallback(promise, cb);
}

function tempNotFound(err){
  return err.notFound;
}

function containsFile(directory, filename){
  if(typeof filename.deref === 'function'){
    filename = filename.deref();
  }

  filename = path.basename(filename);

  var contains = directory
    .map(function(file){
      return file.get('name');
    })
    .contains(filename);

  return contains;
}

function normalizePath(dirpath, filepath){
  return path.resolve(dirpath, filepath);
}

function createFile(filename){
  return immutable.fromJS({ name: path.basename(filename) });
}

function createFileWithTemp(filename){
  var file = createFile(filename);

  return tempGet(filename)
    .then(function(){
      return file.set('temp', true);
    })
    .catch(tempNotFound, function(){
      return file.set('temp', false);
    });
}

function createFiles(filenames, opts, cb){
  if(typeof opts === 'function'){
    cb = opts;
    opts = {};
  }

  opts.cwd = opts.cwd || root;
  opts.checkTemp = opts.checkTemp || false;

  filenames = filenames.map(function(filename){
    return normalizePath(opts.cwd, filename);
  });

  var promise;
  if(opts.checkTemp){
    promise = when.map(filenames, createFileWithTemp);
  } else {
    promise = when.map(filenames, createFile);
  }

  return nodefn.bindCallback(promise, cb);
}

module.exports = {
  root: root,
  normalizePath: normalizePath,
  containsFile: containsFile,
  createFiles: createFiles,
  temp: {
    get: tempGet,
    put: tempPut,
    del: tempDel,
    notFound: tempNotFound
  }
};
