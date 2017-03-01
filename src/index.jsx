import React from 'react'
import { render } from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux' 
import { browserHistory } from 'react-router'
//公共方法||类载入，用window对象访问
import configureStore from './store'
import Container from './container'

function index(routes,reducers){
  if(useImmutable) {
    var Immutable = require('immutable');
    var initialState = Immutable.Map();
  }else {
    var initialState = {};
  }
  const store = configureStore(initialState,browserHistory,reducers);
  var history = syncHistoryWithStore(browserHistory, store,{
    selectLocationState (state) {
      if(useImmutable){
        return state.get('routing').toJS();
      }else{
        return state.routing;
      }
    } 
  }); 
  function renderApp() {
    const target = document.getElementById('app_container');
    if (target) {
      render(
        <Container store={store} history={history} routes={routes}/>,
        target
      );
    }
  }

  return renderApp; 
}

export default index;
