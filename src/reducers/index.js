'use strict';

const reducers = {
  cwd: require('./cwd'),
  filename: require('./filename'),
  content: require('./content'),
  projects: require('./projects'),
  directory: require('./directory'),
  status: require('./status'),
  notification: require('./notification')
};

module.exports = reducers;
