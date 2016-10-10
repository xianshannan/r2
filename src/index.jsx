import { render } from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux' 
import { browserHistory } from 'react-router'
import Immutable from 'immutable'
//公共方法||类载入，用window对象访问
import configureStore from './store'
import container from './container'

function index(routes,reducers){
  const initialState = Immutable.Map();
  const store = configureStore(initialState,browserHistory,reducers);
  var history = syncHistoryWithStore(browserHistory, store,{
    selectLocationState (state) {
      return state.get('routing').toJS();
    } 
  }) 
  function renderApp(Container) {
    const target = document.getElementById('app_container');
    if (target) {
      render(
        <Container store={store} history={history} routes={routes}/>,
        target
      );
    }
  }

  renderApp(container);

  if (module.hot) {
    module.hot.accept(
      './container',
      () => renderApp(require('./container'))
    );
  }
}

module.exports = index;
