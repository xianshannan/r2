'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *  此类规范化数据处理，事件绑定位置。数据处理类函数需要定义在类方法dataAdapter中，绑定事件需要统一在
 *  events中,动作统一在actions中，调用dataAdapter，events,actions中的方法直接在使用this就可以访问到。需要注意,当集成此类需要,在新建react组件
 *  的render方法中调用父类render方法。因为不调用，这些定义的方法无法热替换,通过defaultProps可以设置页面title
 * @function {getParamsOfId} 参考下面函数解析
 *@example
 * class Test exents Component{
 *  dataAdapter(){
 *    return {
 *    deal(){
 *      
 *    }
 *    }
 *  }
 *
 *  events(){
 *    return{
 *    switch(){
 *      
 *    }
 *    }
 *  }
 *
 *  render(){
 *    super.render();
 *  }
 * }
 */
var BasicComponent = function (_React$Component) {
  _inherits(BasicComponent, _React$Component);

  function BasicComponent(props) {
    _classCallCheck(this, BasicComponent);

    var _this = _possibleConstructorReturn(this, (BasicComponent.__proto__ || Object.getPrototypeOf(BasicComponent)).call(this, props));

    _this.state = {};
    _this.bindFunctions();
    if (props && props.title) {
      document.title = props.title + props.titleSffix;
    }
    return _this;
  }

  _createClass(BasicComponent, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var nextState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var thisProps = this.props || {},
          thisState = this.state || {};

      if (Object.keys(thisProps).length !== Object.keys(nextProps).length || Object.keys(thisState).length !== Object.keys(nextState).length) {
        return true;
      }

      for (var key in nextProps) {
        if (thisProps[key] !== nextProps[key] || !(0, _immutable.is)(thisProps[key], nextProps[key])) {
          //console.debug(thisProps[key],nextProps[key])
          return true;
        }
      }

      for (var _key in nextState) {
        if (thisState[_key] !== nextState[_key] || !(0, _immutable.is)(thisState[_key], nextState[_key])) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'bindFunctions',
    value: function bindFunctions() {
      if (this.dataAdapter) {
        Object.assign(this, this.dataAdapter());
        if (!module.hot) {
          this.dataAdapter = null;
        }
      }
      if (this.events) {
        Object.assign(this, this.events());
        if (!module.hot) {
          this.events = null;
        }
      }
      if (this.actions) {
        Object.assign(this, this.actions());
        if (!module.hot) {
          this.actions = null;
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (module.hot) {
        this.bindFunctions();
      }
    }
  }]);

  return BasicComponent;
}(_react2.default.Component);

module.exports = BasicComponent;