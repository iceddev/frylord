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

  before(function(done){
    init()
      .then(() => ls(dirPath))
      .then((entries) => {
        _.forEach(entries, (entry) => {
          return rm(entry);
        });
      })
      .catch(console.log.bind(console, 'before of listProjects: '))
      .finally(() => done());
  });

  beforeEach(function(done){
    init()
      .then(() => cd(dirPath))
      .then(function(){
        return map(projects, (val) => {
          return mkdir(val, false);
        });
      })
      .catch(console.log.bind(console, 'beforeEach of listProjects: '))
      .finally(() => done());
  });

  afterEach(function(done){
    init()
      .then(() => ls(dirPath))
      .then((entries) => {
        _.forEach(entries, (entry) => {
          return rm(entry);
        });
      })
      .catch(console.log.bind(console, 'afterEach of listProjects: '))
      .finally(() => done());
  });

  it('returns the projects in a given directory', function(done){
    listProjects()
      .then(function(projectsArr){
        expect(projectsArr.length).toEqual(projects.length);
      })
      .finally(() => done(), done);
  });
});
