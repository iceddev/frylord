'use strict';

const _ = require('lodash');
const expect = require('expect');
const { map } = require('when');

const listProjects = require('../list-projects');
const {
  init,
  cd,
  mkdir,
  ls,
  rm
} = require('../../filer');

const projects = _.map(new Array(5), (val, idx) => {
  return `/project${idx + 1}`;
});

const dirPath = '/';

describe('listProjects methods', function(){

  beforeEach(function(){
    return init()
      .then(() => cd(dirPath))
      .then(() => map(projects, (val) => mkdir(val, false)));
  });

  afterEach(function(){
    return init()
      .then(() => ls(dirPath))
      .then((entries) => map(entries, (entry) => rm(entry)));
  });

  it('returns the projects in a given directory', function(){
    return listProjects()
      .then(function(projectsArr){
        expect(projectsArr.length).toEqual(projects.length);
      });
  });
});
