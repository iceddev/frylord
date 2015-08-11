'use strict';

const creators = {
  changeDirectorySuccess: require('change-directory-success'),
  changeDirectoryError: require('change-directory-error'),
  changeFileSuccess: require('change-file-success'),
  changeFileError: require('change-file-error'),
  deleteDirectorySuccess: require('delete-directory-success'),
  deleteDirectoryError: require('delete-directory-error'),
  deleteFileSuccess: require('delete-file-success'),
  deleteFileError: require('delete-file-error'),
  newFileSuccess: require('new-file-success'),
  refreshDirectorySuccess: require('refresh-directory-success'),
  refreshDirectoryError: require('refresh-directory-error'),
  resetFileSuccess: require('reset-file-success'),
  saveFileSuccess: require('save-file-success'),
  saveFileError: require('save-file-error'),
  updateContentSuccess: require('update-content-success'),
  updateFilenameSuccess: require('update-filename-success')
};

module.exports = creators;
