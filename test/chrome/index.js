'use strict';

const Workspace = require('../../src/stores/workspace');
const fileActions = require('../../src/actions/file');
const currentActions = require('../../src/actions/current');
const directoryActions = require('../../src/actions/directory');


console.log(Workspace, fileActions, currentActions, directoryActions);

directoryActions.changeDirectory('/testfolder');
setTimeout(function(){
  fileActions.saveFile('test-thing.txt', 'test me thing');
    setTimeout(function(){
      fileActions.loadFile('test-thing.txt');
    }, 1000);
}, 1000);
