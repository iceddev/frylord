'use strict';

const alt = require('../alt');

class DirectoryActions {
  changeDirectory(path){
    this.dispatch(path);
  }
  deleteDirectory(path){
    this.dispatch(path);
  }
}

module.exports = alt.createActions(DirectoryActions);
