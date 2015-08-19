'use strict';

const expect = require('expect');
const { pick } = require('lodash');
const { isFSA } = require('flux-standard-action');

const { changeDirectorySuccess } = require('../');
const { CHANGE_DIRECTORY } = require('../../constants');
const { CHANGE_DIRECTORY_SUCCESS } = require('../../status-constants');

describe('changeDirectorySuccess creator', function(){
  const data = {
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
  const action = changeDirectorySuccess(data);

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(action)).toEqual(true);
    done();
  });

  it(`returns an action with type equal to 'CHANGE_DIRECTORY'`, function(done){
    expect(action.type).toEqual(CHANGE_DIRECTORY);
    done();
  });

  it(`returns an action.payload.notification that includes cwd`, function(done){
    expect(action.payload.notification).toInclude(data.cwd);
    done();
  });

  it(`returns an action.payload.status that equals 'CHANGE_DIRECTORY_SUCCESS'`, function(done){
    expect(action.payload.status).toEqual(CHANGE_DIRECTORY_SUCCESS);
    done();
  });

  it(`attaches the 'cwd' property of data arg to action.payload`, function(done){
    expect(action.payload.cwd).toEqual(data.cwd);
    done();
  });

  it(`attaches the 'listing' property of data arg to action.payload`, function(done){
    expect(action.payload.listing).toEqual(data.listing);
    done();
  });

  it(`attaches the 'projects' property of data arg to action.payload`, function(done){
    expect(action.payload.projects).toEqual(data.projects);
    done();
  });

  it(`returns an action.payload object that only has known properties`, function(done){
    const expectedProps = [
      'notification',
      'status',
      'cwd',
      'listing',
      'projects'
    ];
    expect(pick(action.payload, expectedProps)).toEqual(action.payload);
    done();
  });
});