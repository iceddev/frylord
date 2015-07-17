'use strict';

const { createStore, combineReducers, applyMiddleware } = require('redux');
const reduxPromise = require('redux-promise');

const reducers = require('./reducers');

const reducer = combineReducers(reducers);

const middleware = [reduxPromise];

const finalCreateStore = applyMiddleware(...middleware)(createStore);

function storeCreator(){
  return finalCreateStore(reducer);
}

module.exports = storeCreator;
