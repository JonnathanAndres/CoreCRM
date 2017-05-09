(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("antd/lib/layout"), require("antd/lib/layout/style/css"), require("antd/lib/menu"), require("antd/lib/menu/style/css"), require("babel-runtime/helpers/extends"));
	else if(typeof define === 'function' && define.amd)
		define(["antd/lib/layout", "antd/lib/layout/style/css", "antd/lib/menu", "antd/lib/menu/style/css", "babel-runtime/helpers/extends"], factory);
	else if(typeof exports === 'object')
		exports["App"] = factory(require("antd/lib/layout"), require("antd/lib/layout/style/css"), require("antd/lib/menu"), require("antd/lib/menu/style/css"), require("babel-runtime/helpers/extends"));
	else
		root["App"] = factory(root["antd/lib/layout"], root["antd/lib/layout/style/css"], root["antd/lib/menu"], root["antd/lib/menu/style/css"], root["babel-runtime/helpers/extends"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__) {
return webpackJsonpApp([4],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _css = __webpack_require__(9);

	var _layout = __webpack_require__(8);

	var _layout2 = _interopRequireDefault(_layout);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _NavigationBar = __webpack_require__(5);

	var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

	var _Layout = __webpack_require__(7);

	var _Layout2 = _interopRequireDefault(_Layout);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Header = _layout2.default.Header,
	    Footer = _layout2.default.Footer,
	    Content = _layout2.default.Content;


	var Layout = function Layout(props) {
	  return _react2.default.createElement(
	    _layout2.default,
	    { className: _Layout2.default.layout },
	    _react2.default.createElement(
	      Header,
	      { className: _Layout2.default.header },
	      _react2.default.createElement(
	        'div',
	        { className: _Layout2.default.logo },
	        'CoreCRM'
	      ),
	      _react2.default.createElement(_NavigationBar2.default, null)
	    ),
	    _react2.default.createElement(
	      Content,
	      { className: _Layout2.default.content },
	      props.children
	    ),
	    _react2.default.createElement(
	      Footer,
	      { className: _Layout2.default.footer },
	      'CoreCRM \u7248\u6743\u6240\u6709 \xA92017'
	    )
	  );
	};

	Layout.propTypes = {};

	exports.default = Layout;
	module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _css = __webpack_require__(11);

	var _menu = __webpack_require__(10);

	var _menu2 = _interopRequireDefault(_menu);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var NavigationBar = function NavigationBar() {
	  return _react2.default.createElement(
	    _menu2.default,
	    {
	      theme: 'dark',
	      mode: 'horizontal',
	      defaultSelectedKeys: ['2'],
	      style: { lineHeight: '64px' }
	    },
	    _react2.default.createElement(
	      _menu2.default.Item,
	      { key: '1' },
	      'nav 1'
	    ),
	    _react2.default.createElement(
	      _menu2.default.Item,
	      { key: '2' },
	      'nav 2'
	    ),
	    _react2.default.createElement(
	      _menu2.default.Item,
	      { key: '3' },
	      'nav 3'
	    )
	  );
	};

	NavigationBar.propTypes = {};

	exports.default = NavigationBar;
	module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(12);

	var _extends3 = _interopRequireDefault(_extends2);

	var _regenerator = __webpack_require__(13);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  namespace: 'navigationBar',

	  state: {},

	  subscriptions: {
	    setup: function setup(_ref) {// eslint-disable-line

	      var dispatch = _ref.dispatch,
	          history = _ref.history;
	    }
	  },

	  effects: {
	    fetch: _regenerator2.default.mark(function fetch(_ref2, _ref3) {
	      var payload = _ref2.payload;
	      var call = _ref3.call,
	          put = _ref3.put;
	      return _regenerator2.default.wrap(function fetch$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _context.next = 2;
	              return put({ type: 'save' });

	            case 2:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, fetch, this);
	    })
	  },

	  reducers: {
	    save: function save(state, action) {
	      return (0, _extends3.default)({}, state, action.payload);
	    }
	  }

	};
	module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"header":"header___16QSy","footer":"footer___1pUix","content":"content___1rXXt","logo":"logo___Gb1wi"};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = require("antd/lib/layout");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = require("antd/lib/layout/style/css");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = require("antd/lib/menu");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = require("antd/lib/menu/style/css");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/extends");

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _dva = __webpack_require__(2);

	var _dva2 = _interopRequireDefault(_dva);

	var _router = __webpack_require__(3);

	__webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 1. Initialize
	var app = (0, _dva2.default)({
	  history: _router.hashHistory
	});

	// 2. Plugins
	// app.use({});

	// 3. Model
	app.model(__webpack_require__(6));

	// 4. Router
	app.router(__webpack_require__(27).RouterConfig);

	// 5. Start
	app.start('#root');

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _dva = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import styles from './Index.css';

	function Employee() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u529E\u516C/\u7EC4\u7EC7\u67B6\u6784/\u7528\u6237\u7BA1\u7406'
	  );
	}

	Employee.propTypes = {};

	exports.default = (0, _dva.connect)()(Employee);
	module.exports = exports['default'];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _dva = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import styles from './Index.css';

	function Structure() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u529E\u516C/\u7EC4\u7EC7\u67B6\u6784'
	  );
	}

	Structure.propTypes = {};

	exports.default = (0, _dva.connect)()(Structure);
	module.exports = exports['default'];

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.routes = undefined;
	exports.RouterConfig = RouterConfig;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _router = __webpack_require__(3);

	var _Layout = __webpack_require__(4);

	var _Layout2 = _interopRequireDefault(_Layout);

	var _Structure = __webpack_require__(26);

	var _Structure2 = _interopRequireDefault(_Structure);

	var _Employee = __webpack_require__(25);

	var _Employee2 = _interopRequireDefault(_Employee);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routes = exports.routes = _react2.default.createElement(
	  _router.Route,
	  { path: '/', component: _Layout2.default },
	  _react2.default.createElement(_router.IndexRedirect, { to: '/structure' }),
	  _react2.default.createElement(_router.Route, { path: 'structure', component: _Structure2.default }),
	  _react2.default.createElement(_router.Route, { path: 'employee', component: _Employee2.default })
	);

	function RouterConfig(_ref) {
	  var history = _ref.history;

	  return _react2.default.createElement(
	    _router.Router,
	    { history: history },
	    routes
	  );
	}

/***/ })
])
});
;