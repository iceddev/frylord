'use strict';

const _ = require('lodash');
const pipeline = require('when/pipeline');

const { listProjectsSuccess, listProjectsError } = require('../creators');
const { listProjects } = require('../methods');

function pluckProjects(projects){
  return _.pluck(projects, 'name');
}

const seq = [
  listProjects,
  pluckProjects,
  listProjectsSuccess
];

function list(){
  return pipeline(seq)
    .catch(listProjectsError);
}

module.exports = list;
