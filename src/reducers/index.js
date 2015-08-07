'use strict';

const reducers = {
  cwd: require('./cwd'),
  filename: require('./filename'),
  content: require('./content'),
  projects: require('./projects'),
  directory: require('./directory'),
  status: require('./status'),
  notification: require('./notification'),
  unsaved: require('./unsaved'),
  isNew: require('./is-new')
};

module.exports = reducers;
