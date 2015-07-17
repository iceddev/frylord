'use strict';

const actions = {
  readFile: require('./read-file'),
  writeFile: require('./write-file'),
  changeFile: require('./change-file'),
  listDirectory: require('./list-directory'),
  changeDirectory: require('./change-directory')
};

module.exports = actions;
