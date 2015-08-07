'use strict';

const methods = {
  readFile: require('./read-file'),
  writeFile: require('./write-file'),
  removeFile: require('./remove'),
  listCwd: require('./list-cwd'),
  listRoot: require('./list-root'),
  listDir: require('./list-dir'),
  removeDir: require('./remove'),
  changeDir: require('./change-dir'),
  listProjects: require('./list-projects')
};

module.exports = methods;
