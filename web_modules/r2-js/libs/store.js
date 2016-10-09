import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'

export default function configureStore(initialState,browserHistory,rootReducer) {
  let middleware = [thunkMiddleware];
  //下面这句话，必须设置，要不push没用
  const router = routerMiddleware(browserHistory)
  if (process.env.NODE_ENV == 'development') {
    middleware.push(router,createLogger());
  }else{
    middleware.push(router);
  }
  const finalCreateStore = applyMiddleware(...middleware)(createStore);
  const store = finalCreateStore(rootReducer, initialState);
  return store;
}
