'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { deleteDirectorySuccess } = require('../');
const { DELETE_DIRECTORY } = require('../../constants');
const { DELETE_DIRECTORY_SUCCESS } = require('../../status-constants');

describe('deleteDirectorySuccess creator', function(){
  const data = {
    dirpath: 'deleteDirectorySuccess/',
    listing: [
      'file1.txt',
      'file2.txt'
    ],
    projects: [
      'project1/',
      'project2/'
    ]
  };
  const action = deleteDirectorySuccess(data);

  it(`returns a 'Flux Standard Action'`, function(done){
    expect(isFSA(action)).toEqual(true);
    done();
  });

  it(`returns an action with type equal to 'DELETE_DIRECTORY'`, function(done){
    expect(action.type).toEqual(DELETE_DIRECTORY);
    done();
  });

  it(`returns an action.payload.notification that includes dirpath`, function(done){
    expect(action.payload.notification).toInclude(data.dirpath);
    done();
  });

  it(`returns an action.payload.status that equals 'DELETE_DIRECTORY_SUCCESS'`, function(done){
    expect(action.payload.status).toEqual(DELETE_DIRECTORY_SUCCESS);
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
});