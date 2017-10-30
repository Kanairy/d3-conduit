'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Selection = require('d3-selection');

var _shortid = require('shortid');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// d3Conduit creates a mounting point and emulates a react-like
// render and update pattern. The initFn should handle the initial
// draw (axes, labels), while the renderFn will handle D3 lifecycle
// actions, like data entry, exit and update. The update and render
// functions are called internally with a reference to the dom node created
// by react. See comments in relevant functions for further comments on the
// expected behaviour. d3Conduit should serve as a separator so that any
// D3 code written will not care that it exists in a react context.
var d3Conduit = function d3Conduit(initFn, renderFn, originalOptions) {
  var _class, _temp;

  if (typeof initFn !== 'function') {
    throw new Error('must provide an initialise function');
  }

  if (typeof renderFn !== 'function') {
    throw new Error('must provide a render function');
  }

  var options = Object.assign(originalOptions, (0, _lodash.defaultsDeep)(originalOptions, {
    width: 900,
    height: 500,
    margin: {
      top: 120,
      right: 50,
      bottom: 150,
      left: 150
    }
  }));

  return _temp = _class = function (_React$Component) {
    _inherits(D3Container, _React$Component);

    function D3Container(props) {
      _classCallCheck(this, D3Container);

      var _this = _possibleConstructorReturn(this, (D3Container.__proto__ || Object.getPrototypeOf(D3Container)).call(this, props));

      _this.width = options.width;
      _this.height = options.height;
      _this.options = options;
      // assign an id so that makeResponsiveSVG can target and
      // responsively resize the svg.
      _this.id = (0, _shortid.generate)();
      _this.makeResponsiveSVG = _this.makeResponsiveSVG.bind(_this);

      _this.state = {
        data: _this.props.data
      };
      return _this;
    }

    _createClass(D3Container, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate() {
        // this should prevent the render function ever being called
        // after initial mount.
        return false;
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        // initialisation of axes and labels
        initFn(this.node, this.state.data, options);
        // call render once for initial draw of data
        renderFn(this.node, this.state.data, options);
        (0, _d3Selection.select)(this.node).call(this.makeResponsiveSVG);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(_ref) {
        var _this2 = this;

        var data = _ref.data;

        this.setState({ data: data }, function () {
          renderFn(_this2.node, _this2.state.data, options);
          return;
        });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        // the d3 .remove() function should handle clean-up of all attached
        // nodes and listeners.
        (0, _d3Selection.select)(this.node).remove();
      }
    }, {
      key: 'makeResponsiveSVG',
      value: function makeResponsiveSVG(svg) {
        // sets viewBox and preserveAspectRatio, as per convention used in D3.
        var width = parseInt(svg.style('width'), 0);
        var height = parseInt(svg.style('height'), 0);

        var resize = function resize() {
          svg.attr('width', '100%').attr('height', '100%');
        };

        svg.attr('viewBox', '0 0 ' + width + ' ' + height).attr('preserveAspectRatio', 'xMinYMid').call(resize);

        (0, _d3Selection.select)(window).on('resize.' + svg.attr('id'), resize);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        // unlike regular react components, this render function
        // should only ever be called a single time.
        var props = {
          ref: function ref(node) {
            _this3.node = node;
            return;
          },
          className: this.props.className || null,
          width: this.width,
          height: this.height,
          id: this.id
        };

        return _react2.default.createElement(
          'div',
          { className: 'd3-container' },
          _react2.default.createElement('svg', props)
        );
      }
    }]);

    return D3Container;
  }(_react2.default.Component), _class.propTypes = {
    data: _propTypes2.default.any.isRequired,
    className: _propTypes2.default.string
  }, _class.defaultProps = {
    className: 'd3Conduit'
  }, _class.displayName = options.displayName, _temp;
};

exports.default = d3Conduit;