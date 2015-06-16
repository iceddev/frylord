'use strict';

const path = require('path');

const fs = require('fs-extra');

const alt = require('../alt');
const defaultStatuses = require('../statuses');
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
      status: '',
      message: '',
      root: '/',
      filename: '',
      content: '',
      cwd: '/',
      directory: [],
      projects: [],
      error: null
    };
  }

  handleError(err){
    console.log(err);
    this.setState({
      error: err
    });
  }

  resolveDir(dir){
    return path.resolve(this.state.root, dir);
  }

  resolveFile(relativePath){
    return path.resolve(this.resolveDir(this.state.cwd), relativePath);
  }

  updateStatus(status){
    const { statuses = defaultStatuses } = this.getInstance();

    const replacer = (match, group1) => {
      return this.state[group1];
    };

    this.setState({
      status: status,
      message: statuses[status].replace(/\$\{([^}]*)\}/g, replacer)
    });
  }

  updateProjectList(){
    fs.readdir(this.state.root, (err, folders) => {
      console.log('updatefolders', err, folders);
      if(err){
        this.handleError(err);
      }else{
        this.setState({
          projects: folders
        });
      }
    });
  }

  updateDirectory(dirpath){
    fs.readdir(this.resolveDir(dirpath), (err, files) => {
      console.log('updatedir', err, files);
      if(err){
        this.handleError(err);
      }else{
        this.setState({
          directory: files
        });
      }
    });
  }

  onChangeDirectory(dir){
    this.updateStatus('DIRECTORY_CHANGE_PROGRESS');

    fs.ensureDir(this.resolveDir(dir), (err) => {
      if(err){
        this.handleError(err);
        this.updateStatus('DIRECTORY_CHANGE_FAILURE');
      } else {
        this.setState({
          cwd: dir
        });
        this.updateProjectList();
        this.updateDirectory(dir);
        this.updateStatus('DIRECTORY_CHANGE_SUCCESS');
      }
    });
  }

  onDeleteDirectory(dirname){
    this.updateStatus('DIRECTORY_DELETE_PROGRESS');

    fs.remove(this.resolveDir(dirname), (err) => {
      if(err){
        this.handleError(err);
        this.updateStatus('DIRECTORY_DELETE_FAILURE');
      } else {
        this.setState({
          cwd: '',
          filename: '',
          content: ''
        });
        this.updateStatus('DIRECTORY_DELETE_SUCCESS');
      }
    });
  }

  onLoadFile(filepath){
    this.updateStatus('FILE_LOAD_PROGRESS');

    fs.readFile(this.resolveFile(filepath), (err, data) => {
      if(err){
        this.handleError(err);
        this.updateStatus('FILE_LOAD_FAILURE');
      } else {
        this.setState({
          content: data
        });
        this.updateStatus('FILE_LOAD_SUCCESS');
      }
    });
  }

  onSaveFile(opts){
    this.updateStatus('FILE_SAVE_PROGRESS');

    fs.outputFile(this.resolveFile(opts.filename), opts.content, (err) => {
      if(err){
        this.handleError(err);
        this.updateStatus('FILE_SAVE_FAILURE');
      } else {
        this.updateDirectory(this.resolveDir(this.state.cwd));
        this.updateStatus('FILE_SAVE_SUCCESS');
      }
    });
  }

  onDeleteFile(filename){
    this.updateStatus('FILE_DELETE_PROGRESS');

    fs.unlink(this.resolveFile(filename), (err) => {
      if(err){
        this.handleError(err);
        this.updateStatus('FILE_DELETE_FAILURE');
      } else {
        this.setState({
          filename: '',
          content: ''
        });
        this.updateStatus('FILE_DELETE_SUCCESS');
      }
    });
  }

  onUpdateFilename(filename){
    this.setState({ filename });
  }

  onUpdateContent(content){
    this.setState({ content });
  }
}

WorkspaceStore.config = {
  stateKey: 'state'
};

module.exports = alt.createStore(WorkspaceStore);
