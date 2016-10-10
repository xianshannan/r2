'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRouterRedux = require('react-router-redux');

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore(initialState, browserHistory, rootReducer) {
  var middleware = [_reduxThunk2.default];
  //下面这句话，必须设置，要不push没用
  var router = (0, _reactRouterRedux.routerMiddleware)(browserHistory);
  if (process.env.NODE_ENV == 'development') {
    middleware.push(router, (0, _reduxLogger2.default)());
  } else {
    middleware.push(router);
  }
  var finalCreateStore = _redux.applyMiddleware.apply(undefined, middleware)(_redux.createStore);
  var store = finalCreateStore(rootReducer, initialState);
  return store;
}