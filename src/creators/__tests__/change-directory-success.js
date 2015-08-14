'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { changeDirectorySuccess } = require('../');
const { CHANGE_DIRECTORY } = require('../../constants');
const { CHANGE_DIRECTORY_SUCCESS } = require('../../status-constants');

describe('changeDirectorySuccess creator', function(){
  let data, creaction;

  before(function(done){
    data = {
      cwd: 'changeDirectorySuccess/',
      listing: [
        'file1.txt',
        'file2.txt'
      ],
      projects: [
        'project1/',
        'project2/'
      ]
    };
    creaction = changeDirectorySuccess(data);
    done();
  });

  after(function(done){
    data = creaction = null;
    done();
  });

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(creaction)).toEqual(true);
    done();
  });

  it(`returns an action with type equal to '${CHANGE_DIRECTORY}'`, function(done){
    expect(creaction.type).toEqual(CHANGE_DIRECTORY);
    done();
  });

  it(`returns an action.payload.notification that includes cwd`, function(done){
    expect(creaction.payload.notification).toInclude(data.cwd);
    done();
  });

  it(`returns an action.payload.status that equals '${CHANGE_DIRECTORY_SUCCESS}'`, function(done){
    expect(creaction.payload.status).toEqual(CHANGE_DIRECTORY_SUCCESS);
    done();
  });

  it(`attaches the 'cwd' property of data arg to action.payload`, function(done){
    expect(creaction.payload.cwd).toEqual(data.cwd);
    done();
  });

  it(`attaches the 'listing' property of data arg to action.payload`, function(done){
    expect(creaction.payload.listing).toEqual(data.listing);
    done();
  });

  it(`attaches the 'projects' property of data arg to action.payload`, function(done){
    expect(creaction.payload.projects).toEqual(data.projects);
    done();
  });
});