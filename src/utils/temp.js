'use strict';

var when = require('when');
var levelup = require('levelup');
var memdown = require('memdown');

var db = levelup('temp-files', {
  db: memdown,
  valueEncoding: 'json'
});

function tempGet(key, opts){
  return when.promise(function(resolve, reject){
    db.get(key, opts, function(err, result){
      if(err){
        return reject(err);
      }

      resolve(result);
    });
  });
}

function tempPut(key, value, opts){
  return when.promise(function(resolve, reject){
    db.put(key, value, opts, function(err, result){
      if(err){
        return reject(err);
      }

      resolve(result);
    });
  });
}

function tempDel(key, opts){
  return when.promise(function(resolve, reject){
    db.del(key, opts, function(err, result){
      if(err){
        return reject(err);
      }

      resolve(result);
    });
  });
}

function tempNotFound(err){
  return err.notFound;
}

module.exports = {
  get: tempGet,
  put: tempPut,
  del: tempDel,
  notFound: tempNotFound
};
