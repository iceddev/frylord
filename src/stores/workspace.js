'use strict';

const alt = require('../alt');
const { updateFilename, updateContent } = require('../actions/current');
const { loadFile, saveFile, deleteFile } = require('../actions/file');
const { changeDirectory, deleteDirectory } = require('../actions/directory');

class WorkspaceStore {
  constructor(){
    this.bindListeners({
      // directory actions
      onChangeDirectory: changeDirectory,
      onDeleteDirectory: deleteDirectory,
      // file actions
      onLoadFile: loadFile,
      onSaveFile: saveFile,
      onDeleteFile: deleteFile,
      // current actions
      onUpdateFilename: updateFilename,
      onUpdateContent: updateContent
    });

    this.state = {
      filename: '',
      content: '',
      cwd: '/',
      directory: [],
      projects: []
    };
  }

  onChangeDirectory(){

  }

  onDeleteDirectory(){

  }

  onLoadFile(){

  }

  onSaveFile(){

  }

  onDeleteFile(){

  }

  onUpdateFilename(){

  }

  onUpdateContent(){

  }
}

WorkspaceStore.config = {
  stateKey: 'state'
};

module.exports = alt.createStore(WorkspaceStore);
