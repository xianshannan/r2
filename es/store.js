import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

export default function configureStore(initialState, browserHistory, rootReducer) {
  var middleware = [thunkMiddleware];
  //下面这句话，必须设置，要不push没用
  var router = routerMiddleware(browserHistory);
  if (process.env.NODE_ENV == 'development') {
    var createLogger = require('redux-logger');
    middleware.push(router, createLogger());
  } else {
    middleware.push(router);
  }
  var finalCreateStore = applyMiddleware.apply(undefined, middleware)(createStore);
  var store = finalCreateStore(rootReducer, initialState);
  return store;
}