'use strict';

const actions = {
  saveFile: require('./save-file'),
  deleteFile: require('./delete-file'),
  changeFile: require('./change-file'),
  deleteDirectory: require('./delete-directory'),
  changeDirectory: require('./change-directory')
};

module.exports = actions;
