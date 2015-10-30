'use strict';

const { LIST_PROJECTS } = require('../constants');

function listProjectsSuccess(projects){
  return {
    type: LIST_PROJECTS,
    payload: {
      projects
    }
  };
}

module.exports = listProjectsSuccess;
