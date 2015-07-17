'use strict';

var frylord = require('../');

var app = {
  expose: function(namespace, exposed){
    window[namespace] = exposed;
  }
};

frylord(app, {}, function(){});
