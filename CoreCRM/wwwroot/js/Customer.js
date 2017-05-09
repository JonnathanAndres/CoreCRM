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
return webpackJsonpApp([1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17);


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
/* 16 */,
/* 17 */
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
	app.router(__webpack_require__(45).RouterConfig);

	// 5. Start
	app.start('#root');

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
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

	function Add() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u5BA2\u6237\u7BA1\u7406/\u6DFB\u52A0\u5BA2\u6237'
	  );
	}

	Add.propTypes = {};

	exports.default = (0, _dva.connect)()(Add);
	module.exports = exports['default'];

/***/ }),
/* 29 */
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

	function Care() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u5BA2\u6237\u7BA1\u7406/\u5BA2\u6237\u5173\u6000'
	  );
	}

	Care.propTypes = {};

	exports.default = (0, _dva.connect)()(Care);
	module.exports = exports['default'];

/***/ }),
/* 30 */
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

	function Add() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u5BA2\u6237\u7BA1\u7406/\u6DFB\u52A0\u8054\u7CFB\u4EBA'
	  );
	}

	Add.propTypes = {};

	exports.default = (0, _dva.connect)()(Add);
	module.exports = exports['default'];

/***/ }),
/* 31 */
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

	function Edit() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u5BA2\u6237\u7BA1\u7406/\u7F16\u8F91\u8054\u7CFB\u4EBA'
	  );
	}

	Edit.propTypes = {};

	exports.default = (0, _dva.connect)()(Edit);
	module.exports = exports['default'];

/***/ }),
/* 32 */
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

	function Index() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u5BA2\u6237\u7BA1\u7406/\u8054\u7CFB\u4EBA'
	  );
	}

	Index.propTypes = {};

	exports.default = (0, _dva.connect)()(Index);
	module.exports = exports['default'];

/***/ }),
/* 33 */
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

	function View() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u5BA2\u6237\u7BA1\u7406/\u8054\u7CFB\u4EBA\u8BE6\u60C5'
	  );
	}

	View.propTypes = {};

	exports.default = (0, _dva.connect)()(View);
	module.exports = exports['default'];

/***/ }),
/* 34 */
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

	function Edit() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u5BA2\u6237\u7BA1\u7406/\u7F16\u8F91\u5BA2\u6237'
	  );
	}

	Edit.propTypes = {};

	exports.default = (0, _dva.connect)()(Edit);
	module.exports = exports['default'];

/***/ }),
/* 35 */
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

	function Index() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u5BA2\u6237\u7BA1\u7406/\u5BA2\u6237\u89C6\u56FE'
	  );
	}

	Index.propTypes = {};

	exports.default = (0, _dva.connect)()(Index);
	module.exports = exports['default'];

/***/ }),
/* 36 */
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

	function Pool() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u5BA2\u6237\u7BA1\u7406/\u5BA2\u6237\u6C60'
	  );
	}

	Pool.propTypes = {};

	exports.default = (0, _dva.connect)()(Pool);
	module.exports = exports['default'];

/***/ }),
/* 37 */
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

	function Add() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u5BA2\u6237\u7BA1\u7406/\u65B0\u5EFA\u7EBF\u7D22'
	  );
	}

	Add.propTypes = {};

	exports.default = (0, _dva.connect)()(Add);
	module.exports = exports['default'];

/***/ }),
/* 38 */
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

	function Edit() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u5BA2\u6237\u7BA1\u7406/\u7F16\u8F91\u7EBF\u7D22'
	  );
	}

	Edit.propTypes = {};

	exports.default = (0, _dva.connect)()(Edit);
	module.exports = exports['default'];

/***/ }),
/* 39 */
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

	function Index() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u5BA2\u6237\u7BA1\u7406/\u7EBF\u7D22'
	  );
	}

	Index.propTypes = {};

	exports.default = (0, _dva.connect)()(Index);
	module.exports = exports['default'];

/***/ }),
/* 40 */
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

	function Pool() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u5BA2\u6237\u7BA1\u7406/\u7EBF\u7D22\u6C60'
	  );
	}

	Pool.propTypes = {};

	exports.default = (0, _dva.connect)()(Pool);
	module.exports = exports['default'];

/***/ }),
/* 41 */
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

	function Statistics() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u5BA2\u6237\u7BA1\u7406/\u7EBF\u7D22\u7EDF\u8BA1'
	  );
	}

	Statistics.propTypes = {};

	exports.default = (0, _dva.connect)()(Statistics);
	module.exports = exports['default'];

/***/ }),
/* 42 */
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

	function View() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u5BA2\u6237\u7BA1\u7406/\u7EBF\u7D22\u8BE6\u60C5'
	  );
	}

	View.propTypes = {};

	exports.default = (0, _dva.connect)()(View);
	module.exports = exports['default'];

/***/ }),
/* 43 */
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

	function Statistics() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u5BA2\u6237\u7BA1\u7406/\u5BA2\u6237\u7EDF\u8BA1'
	  );
	}

	Statistics.propTypes = {};

	exports.default = (0, _dva.connect)()(Statistics);
	module.exports = exports['default'];

/***/ }),
/* 44 */
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

	function View() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    '\u5BA2\u6237\u7BA1\u7406/\u5BA2\u6237\u8BE6\u60C5'
	  );
	}

	View.propTypes = {};

	exports.default = (0, _dva.connect)()(View);
	module.exports = exports['default'];

/***/ }),
/* 45 */
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

	var _Index = __webpack_require__(35);

	var _Index2 = _interopRequireDefault(_Index);

	var _Add = __webpack_require__(28);

	var _Add2 = _interopRequireDefault(_Add);

	var _Edit = __webpack_require__(34);

	var _Edit2 = _interopRequireDefault(_Edit);

	var _Care = __webpack_require__(29);

	var _Care2 = _interopRequireDefault(_Care);

	var _View = __webpack_require__(44);

	var _View2 = _interopRequireDefault(_View);

	var _Pool = __webpack_require__(36);

	var _Pool2 = _interopRequireDefault(_Pool);

	var _Statistics = __webpack_require__(43);

	var _Statistics2 = _interopRequireDefault(_Statistics);

	var _Index3 = __webpack_require__(32);

	var _Index4 = _interopRequireDefault(_Index3);

	var _Add3 = __webpack_require__(30);

	var _Add4 = _interopRequireDefault(_Add3);

	var _Edit3 = __webpack_require__(31);

	var _Edit4 = _interopRequireDefault(_Edit3);

	var _View3 = __webpack_require__(33);

	var _View4 = _interopRequireDefault(_View3);

	var _Index5 = __webpack_require__(39);

	var _Index6 = _interopRequireDefault(_Index5);

	var _Add5 = __webpack_require__(37);

	var _Add6 = _interopRequireDefault(_Add5);

	var _Edit5 = __webpack_require__(38);

	var _Edit6 = _interopRequireDefault(_Edit5);

	var _View5 = __webpack_require__(42);

	var _View6 = _interopRequireDefault(_View5);

	var _Pool3 = __webpack_require__(40);

	var _Pool4 = _interopRequireDefault(_Pool3);

	var _Statistics3 = __webpack_require__(41);

	var _Statistics4 = _interopRequireDefault(_Statistics3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routes = exports.routes = _react2.default.createElement(
	  _router.Route,
	  { path: '/', component: _Layout2.default },
	  _react2.default.createElement(_router.IndexRoute, { component: _Index2.default }),
	  _react2.default.createElement(_router.Route, { path: 'add', component: _Add2.default }),
	  _react2.default.createElement(_router.Route, { path: 'edit', component: _Edit2.default }),
	  _react2.default.createElement(_router.Route, { path: 'view', component: _View2.default }),
	  _react2.default.createElement(_router.Route, { path: 'care', component: _Care2.default }),
	  _react2.default.createElement(_router.Route, { path: 'pool', component: _Pool2.default }),
	  _react2.default.createElement(_router.Route, { path: 'statistics', component: _Statistics2.default }),
	  _react2.default.createElement(
	    _router.Route,
	    { path: 'contact' },
	    _react2.default.createElement(_router.IndexRoute, { component: _Index4.default }),
	    _react2.default.createElement(_router.Route, { path: 'add', component: _Add4.default }),
	    _react2.default.createElement(_router.Route, { path: 'edit', component: _Edit4.default }),
	    _react2.default.createElement(_router.Route, { path: 'view', component: _View4.default })
	  ),
	  _react2.default.createElement(
	    _router.Route,
	    { path: 'potential' },
	    _react2.default.createElement(_router.IndexRoute, { component: _Index6.default }),
	    _react2.default.createElement(_router.Route, { path: 'add', component: _Add6.default }),
	    _react2.default.createElement(_router.Route, { path: 'edit', component: _Edit6.default }),
	    _react2.default.createElement(_router.Route, { path: 'view', component: _View6.default }),
	    _react2.default.createElement(_router.Route, { path: 'pool', component: _Pool4.default }),
	    _react2.default.createElement(_router.Route, { path: 'statistics', component: _Statistics4.default })
	  )
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