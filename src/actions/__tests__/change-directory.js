'use strict';

const _ = require('lodash');
const { map } = require('when');
const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { changeDirectory } = require('../');
const { CHANGE_DIRECTORY, ERROR } = require('../../constants');
const { CHANGE_DIRECTORY_FAILURE } = require('../../status-constants');
const {
  init,
  cd,
  mkdir,
  write,
  rm
} = require('../../filer');
const opts = {
  data: 'This is sample text',
  type: 'text/plain'
};

describe('changeDirectory actions', function(){
  const filenames = _.map(new Array(2), (val, idx) => (`file${idx+1}`));
  let dirpath, projects, notExistPath;

  beforeEach(function(done){
    dirpath = '/changeDirectory';
    projects = [dirpath];
    init()
      .then(() => mkdir(dirpath))
      .then((dirEntry) => cd(dirEntry))
      .then(() => map(filenames, (filename) => write(filename, opts)))
      .then(() => cd('/'))
      .then(() => done(), done);
  });

  afterEach(function(done){
    init()
      .then(() => rm(dirpath))
      .then(function() {
        dirpath = null;
        if(notExistPath){
          notExistPath = null;
        }
      })
      .then(() => done(), done);
  });

  it(`returns a 'Flux Standard Action'`, function(done){
    changeDirectory(dirpath)
      .then(function(action){
        expect(isFSA(action)).toEqual(true);
      })
      .then(() => done(), done);
  });

  it(`returns an object with a 'cwd' property`, function(done){
    changeDirectory(dirpath)
      .then((action) => expect(action.payload.cwd).toEqual(dirpath))
      .then(() => done(), done);
  });

  it(`returns an object with a 'listing' property`, function(done){
    changeDirectory(dirpath)
      .then((action) => expect(action.payload.listing.length).toEqual(filenames.length))
      .then(() => done(), done);
  });

  it(`returns an object with a 'projects' property`, function(done){
    changeDirectory('/')
      .then((action) => expect(action.payload.projects.length).toEqual(projects.length))
      .then(() => done(), done);
  });

  it(`returns an action with a type property that matches ${CHANGE_DIRECTORY}`, function(done){
    changeDirectory(dirpath)
      .then((action) => expect(action.type).toEqual(CHANGE_DIRECTORY))
      .then(() => done(), done);
  });

  it(`on error it returns an action with a type property that matches ${ERROR}`, function(done){
    notExistPath = 1;
    changeDirectory(notExistPath)
      .then((action) => expect(action.type).toEqual(ERROR))
      .then(() => done(), done);
  });

  it(`on error it returns an action with a payload.notification property that includes the bad argument`, function(done){
    notExistPath = 1;
    changeDirectory(notExistPath)
      .then((action) => expect(action.payload.notification).toInclude(notExistPath))
      .then(() => done(), done);
  });

  it(`on error it returns an action with a payload.status property that matches ${CHANGE_DIRECTORY_FAILURE}`, function(done){
    notExistPath = 1;
    changeDirectory(notExistPath)
      .then((action) => expect(action.payload.status).toEqual(CHANGE_DIRECTORY_FAILURE))
      .then(() => done(), done);
  });
});
