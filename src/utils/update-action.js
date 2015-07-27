'use strict';

const _ = require('lodash');

function updateAction({ type, payload }, update){
  return {
    type,
    payload: _.assign({}, payload, update)
  };
}

module.exports = updateAction;
