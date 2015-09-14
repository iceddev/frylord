'use strict';

const methods = {
  updateContent: require('./update-content'),
  newFile: require('./new-file'),
  saveFile: require('./save-file'),
  deleteFile: require('./delete-file'),
  changeFile: require('./change-file'),
  listDir: require('./list-dir'),
  refreshDir: require('./refresh-dir')
};

module.exports = methods;
