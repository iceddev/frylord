'use strict';

const actions = {
  readFile: require('./read-file'),
  writeFile: require('./write-file'),
  changeFile: require('./change-file')
};

module.exports = actions;
