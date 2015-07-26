'use strict';

const { createStore, combineReducers, applyMiddleware } = require('redux');
const reduxPromise = require('redux-promise');
const tempMiddleware = require('./middleware/temp');

const reducers = require('./reducers');

const reducer = combineReducers(reducers);

const middleware = [reduxPromise, tempMiddleware];

const finalCreateStore = applyMiddleware(...middleware)(createStore);

function storeCreator(){
  return finalCreateStore(reducer);
}

module.exports = storeCreator;
