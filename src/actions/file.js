'use strict';

const alt = require('../alt');

class FileActions {
  loadFile(filename){
    this.dispatch(filename);
  }
  saveFile(filename, content){
    this.dispatch({ filename, content });
  }
  deleteFile(filename){
    this.dispatch(filename);
  }
}

module.exports = alt.createActions(FileActions);
