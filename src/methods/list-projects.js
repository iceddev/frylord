'use strict';

const when = require('when');

const listRoot = require('./list-root');

function filterDir({ type }){
  return type === 'directory';
}

function listProjects(){
  return when.filter(listRoot(), filterDir);
}

module.exports = listProjects;
