'use strict';

var levelup = require('levelup');
var memdown = require('memdown');
var map = require('now-and-later').map;

var db = levelup('temp-files', { db: memdown, valueEncoding: 'json' });

function get(filename, cb){
  db.get(filename, cb);
}

function add(filename, contents, cb){
  db.put(filename, contents, cb);
}

function remove(filename, cb){
  db.del(filename, cb);
}

function eachExist(filename, cb){
  db.get(filename, function(err){
    if(err && !err.notFound){
      return cb(err);
    }

    if(err && err.notFound){
      return cb(null, false);
    }

    cb(null, true);
  });
}

function exists(files, cb){
  if(!Array.isArray(files)){
    files = [files];
  }

  map(files, eachExist, cb);
}

module.exports = {
  get: get,
  add: add,
  remove: remove,
  exists: exists
};
