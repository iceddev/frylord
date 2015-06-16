'use strict';

const path = require('path');

const _ = require('lodash');
const fs = require('fs-extra');
const runSeries = require('run-series');

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

  resolveDir(dir){
    return path.resolve(this.state.root, dir);
  }

  resolveFile(relativePath){
    return path.resolve(this.resolveDir(this.state.cwd), relativePath);
  }

  _updateStatus(newState){
    const { status } = newState;
    const { statuses = defaultStatuses } = this.getInstance();

    const replacer = (match, group1) => {
      return _.get(this.state, group1);
    };

    _.assign(this.state, newState);
    this.setState({
      message: statuses[status].replace(/\$\{([^}]*)\}/g, replacer)
    });
  }

  _updateProjectList(cb){
    fs.readdir(this.state.root, (err, projects) => {
      if(err){
        cb(err);
      } else {
        cb(null, { projects });
      }
    });
  }

  _updateDirectory(dirname, cb){
    fs.readdir(this.resolveDir(dirname), (err, files) => {
      const directory = files.map(function(file){
        return {
          name: file,
          temp: false
        };
      });

      if(err){
        cb(err);
      } else {
        cb(null, { directory });
      }
    });
  }

  _changeDirectory(dirname, cb){
    fs.ensureDir(this.resolveDir(dirname), (err, cwd) => {
      if(err){
        cb(err);
      } else {
        cb(null, { cwd });
      }
    });
  }

  _deleteDirectory(dirname, cb){
    fs.remove(this.resolveDir(dirname), (err) => {
      if(err){
        cb(err);
      } else {
        cb();
      }
    });
  }

  _readFile(filename, cb){
    fs.readFile(this.resolveFile(filename), (err, content) => {
      if(err){
        cb(err);
      } else {
        cb(null, { content });
      }
    });
  }

  _createFile(filename, content, cb){
    fs.outputFile(this.resolveFile(filename), content, (err) => {
      if(err){
        cb(err);
      } else {
        cb();
      }
    });
  }

  _deleteFile(filename, cb){
    fs.unlink(this.resolveFile(filename), (err) => {
      if(err){
        cb(err);
      } else {
        cb();
      }
    });
  }

  onChangeDirectory(dir){
    this._updateStatus({
      status: 'DIRECTORY_CHANGE_PROGRESS'
    });

    runSeries([
      (cb) => this._changeDirectory(dir, cb),
      (cb) => this._updateProjectList(cb),
      (cb) => this._updateDirectory(dir, cb)
    ], (err, results) => {
      if(err){
        this._updateStatus({
          status: 'DIRECTORY_CHANGE_FAILURE',
          error: err
        });
      } else {
        let newState = _.assign.apply(_, results.concat({
          status: 'DIRECTORY_CHANGE_SUCCESS'
        }));
        this._updateStatus(newState);
      }
    });
  }

  onDeleteDirectory(dirname){
    this._updateStatus({
      status: 'DIRECTORY_DELETE_PROGRESS'
    });

    this._deleteDirectory(dirname, (err) => {
      if(err){
        this._updateStatus({
          status: 'DIRECTORY_DELETE_FAILURE',
          error: err
        });
      } else {
        this._updateStatus({
          status: 'DIRECTORY_DELETE_SUCCESS',
          cwd: '',
          filename: '',
          content: ''
        });
      }
    });
  }

  onLoadFile(filepath){
    this._updateStatus({
      status: 'FILE_LOAD_PROGRESS',
      filename: filepath
    });

    this._readFile(filepath, (err, result) => {
      if(err){
        this._updateStatus({
          status: 'FILE_LOAD_FAILURE',
          error: err
        });
      } else {
        this._updateStatus(_.assign({
          status: 'FILE_LOAD_SUCCESS'
        }, result));
      }
    });
  }

  onSaveFile(opts){
    this._updateStatus({
      status: 'FILE_SAVE_PROGRESS'
    });

    runSeries([
      (cb) => this._createFile(opts.filename, opts.content, cb),
      (cb) => this._updateDirectory(this.resolveDir(this.state.cwd), cb)
    ], (err, results) => {
      if(err){
        this._updateStatus({
          status: 'FILE_SAVE_FAILURE',
          error: err
        });
      } else {
        let newState = _.assign.apply(_, results.concat({
          status: 'FILE_SAVE_SUCCESS'
        }));
        this._updateStatus(newState);
      }
    });
  }

  onDeleteFile(filename){
    this._updateStatus({
      status: 'FILE_DELETE_PROGRESS'
    });

    this._deleteFile(filename, (err) => {
      if(err){
        this._updateStatus({
          status: 'FILE_DELETE_FAILURE',
          error: err
        });
      } else {
        this._updateStatus({
          status: 'FILE_DELETE_SUCCESS',
          filename: '',
          content: ''
        });
      }
    });
  }

  onUpdateFilename(filename){
    this.setState({
      filename,
      message: '',
      status: ''
    });
  }

  onUpdateContent(content){
    this.setState({
      content,
      message: '',
      status: ''
    });
  }
}

WorkspaceStore.config = {
  stateKey: 'state'
};

module.exports = alt.createStore(WorkspaceStore);
