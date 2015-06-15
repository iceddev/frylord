'use strict';

const fs = require('fs-extra');
const path = require('path');

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
    throw new Error(err.message);
  }

  resolveDir(dir){
    return path.resolve(this.state.root, dir);
  }

  resolveFile(relativePath){
    return path.resolve(this.resolveDir(this.state.cwd), relativePath);
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
    var dirpath = this.resolveDir(dir);
    fs.ensureDir(dirpath, (err) => {
      if(err){
        this.handleError(err);
      }else{
        this.setState({
          cwd: dir,
          directory: []
        });
        this.updateProjectList();
        this.updateDirectory(dir);
      }
    });
  }

  onDeleteDirectory(dirname){
    fs.remove(this.resolveDir(dirname), (err) => {
      if(err){
        this.handleError(err);
      }else{
        this.setState({
          dirname: '',
          filename: '',
          content: ''
        });
      }
    });
  }

  onLoadFile(filepath){
    fs.readFile(this.resolveFile(filepath), (err, data) => {
      if(err){
        this.handleError(err);
      }else{
        console.log('loadfile', filepath, data);
        this.setState({
          content: data
        });
      }
    });
  }

  onSaveFile(opts){
    fs.outputFile(this.resolveFile(opts.filename), opts.content, (err) => {
      if(err){
        this.handleError(err);
      }else{
        this.updateDirectory(this.resolveDir(this.state.cwd));
      }
    });
  }

  onDeleteFile(filename){
    fs.unlink(this.resolveFile(filename), (err) => {
      if(err){
        this.handleError(err);
      }else{
        this.setState({
          filename: '',
          content: ''
        });
      }
    });
  }

  onUpdateFilename(filename){
    fs.move(this.resolveFile(this.state.filename), this.resolveFile(filename), (err) => {
      if(err){
        this.handleError(err);
      }else{
        this.setState({
          filename: filename
        });
        this.updateDirectory(this.state.cwd);
      }
    });
  }

  onUpdateContent(content){
    this.setState({
      content: content
    });
  }
}

WorkspaceStore.config = {
  stateKey: 'state'
};

module.exports = alt.createStore(WorkspaceStore);
