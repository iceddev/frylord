'use strict';

const alt = require('../alt');

class CurrentActions {
  updateContent(content){
    this.dispatch(content);
  }
  updateFilename(filename){
    this.dispatch(filename);
  }
}

module.exports = alt.createActions(CurrentActions);
