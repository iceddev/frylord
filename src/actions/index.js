'use strict';

const actions = {
  updateContent: require('./update-content'),
  updateFilename: require('./update-filename'),
  saveFile: require('./save-file'),
  deleteFile: require('./delete-file'),
  changeFile: require('./change-file'),
  deleteDirectory: require('./delete-directory'),
  changeDirectory: require('./change-directory'),
  refreshDirectory: require('./refresh-directory')
};

module.exports = actions;
