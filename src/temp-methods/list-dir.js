'use strict';

const _ = require('lodash');
const when = require('when');

const { get } = require('../level');
const { listCwd } = require('../methods');
const notFound = require('../utils/not-found');

function tempMapper(entry){
  return get(entry.fullPath)
    .then(() => _.assign({ temp: true }, entry))
    .catch(notFound, () => _.assign({ temp: false }, entry));
}

function listDir(){
  return when.map(listCwd(), tempMapper)
    .then((listing) => ({ listing }));
}

module.exports = listDir;
