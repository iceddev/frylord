'use strict';

const { createStore, combineReducers, applyMiddleware } = require('redux');
const reduxPromise = require('redux-promise');

const reducers = require('./reducers');

const reducer = combineReducers(reducers);

const defaultMiddleware = [reduxPromise];

function storeCreator(extraMiddleware){
  const middleware = defaultMiddleware.concat(extraMiddleware);

  const finalCreateStore = applyMiddleware(...middleware)(createStore);

  return finalCreateStore(reducer);
}

module.exports = storeCreator;
