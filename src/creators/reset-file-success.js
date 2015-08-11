'use strict';

const { RESET_FILE } = require('../constants');

function resetFileSuccess(){
  return {
    type: RESET_FILE,
    payload: {}
  };
}

module.exports = resetFileSuccess;