'use strict';

var _reactDom = require('react-dom');

var _reactRouterRedux = require('react-router-redux');

var _reactRouter = require('react-router');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//公共方法||类载入，用window对象访问
function index(routes, reducers) {
  var initialState = _immutable2.default.Map();
  var store = (0, _store2.default)(initialState, _reactRouter.browserHistory, reducers);
  var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store, {
    selectLocationState: function selectLocationState(state) {
      return state.get('routing').toJS();
    }
  });
  function renderApp(Container) {
    var target = document.getElementById('app_container');
    if (target) {
      (0, _reactDom.render)(React.createElement(Container, { store: store, history: history, routes: routes }), target);
    }
  }

  renderApp(_container2.default);

  if (module.hot) {
    module.hot.accept('./container', function () {
      return renderApp(require('./container'));
    });
  }
}

module.exports = index;