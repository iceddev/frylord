'use strict';

const expect = require('expect');
const { isFSA } = require('flux-standard-action');

const { changeFile } = require('../');
const {
  init,
  write,
  rm
} = require('../../filer');
const { CHANGE_FILE, ERROR } = require('../../constants');
const { CHANGE_FILE_SUCCESS, CHANGE_FILE_FAILURE } = require('../../status-constants');

describe('changeFile action', function(){
  let initial, initialEntry, nextFile, nextFileEntry, notExistFile;
  const type = 'text/plain';

  beforeEach(function(done){
    initial = 'changeFile.txt';
    initialEntry = `content for ${initial}`;
    nextFile = 'nextFile.txt';
    nextFileEntry = `content for ${nextFile}`;
    init()
      .then(() => write(initial, { data: initialEntry, type }))
      .then(() => write(nextFile, { data: nextFileEntry, type }))
      .then(() => done(), done);
  });

  afterEach(function(done){
    init()
      .then(() => rm(initial))
      .then(() => rm(nextFile))
      .then(function(){
        initialEntry = nextFileEntry = notExistFile = null;
      })
      .then(() => done(), done);
  });

  it(`returns a valid 'Flux Standard Action'`, function(done){
    changeFile(initial)
      .then((action) => expect(isFSA(action)).toEqual(true))
      .then(() => done(), done);
  });

  it(`returns an action with a type that matches '${CHANGE_FILE}'`, function(done){
    changeFile(initial)
    .then((action) => expect(action.type).toEqual(CHANGE_FILE))
    .then(() => done(), done);
  });

  it(`returns an action.payload.notification that includes the filename`, function(done){
    changeFile(initial)
    .then((action) => expect(action.payload.notification).toInclude(initial))
    .then(() => changeFile(nextFile))
    .then((action) => expect(action.payload.notification).toInclude(nextFile))
    .then(() => done(), done);
  });

  it(`returns an action.payload that contains a status that matches ${CHANGE_FILE_SUCCESS}`, function(done){
    changeFile(initial)
    .then((action) => expect(action.payload.status).toInclude(CHANGE_FILE_SUCCESS))
    .then(() => done(), done);
  });

  it(`returns an action.payload.filename that is the filename`, function(done){
    changeFile(initial)
    .then((action) => expect(action.payload.filename).toInclude(initial))
    .then(() => changeFile(nextFile))
    .then((action) => expect(action.payload.filename).toInclude(nextFile))
    .then(() => done(), done);
  });

  it(`returns an action.payload.content that is the content`, function(done){
    changeFile(initial)
    .then((action) => expect(action.payload.content).toInclude(initialEntry))
    .then(() => changeFile(nextFile))
    .then((action) => expect(action.payload.content).toInclude(nextFileEntry))
    .then(() => done(), done);
  });
});