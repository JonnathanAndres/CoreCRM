(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("antd/lib/button"), require("antd/lib/button/style/css"), require("antd/lib/checkbox"), require("antd/lib/checkbox/style/css"), require("antd/lib/form"), require("antd/lib/form/style/css"), require("antd/lib/icon"), require("antd/lib/icon/style/css"), require("antd/lib/input"), require("antd/lib/input/style/css"), require("babel-runtime/helpers/asyncToGenerator"), require("dva-loading"), require("dva/fetch"));
	else if(typeof define === 'function' && define.amd)
		define(["antd/lib/button", "antd/lib/button/style/css", "antd/lib/checkbox", "antd/lib/checkbox/style/css", "antd/lib/form", "antd/lib/form/style/css", "antd/lib/icon", "antd/lib/icon/style/css", "antd/lib/input", "antd/lib/input/style/css", "babel-runtime/helpers/asyncToGenerator", "dva-loading", "dva/fetch"], factory);
	else if(typeof exports === 'object')
		exports["App"] = factory(require("antd/lib/button"), require("antd/lib/button/style/css"), require("antd/lib/checkbox"), require("antd/lib/checkbox/style/css"), require("antd/lib/form"), require("antd/lib/form/style/css"), require("antd/lib/icon"), require("antd/lib/icon/style/css"), require("antd/lib/input"), require("antd/lib/input/style/css"), require("babel-runtime/helpers/asyncToGenerator"), require("dva-loading"), require("dva/fetch"));
	else
		root["App"] = factory(root["antd/lib/button"], root["antd/lib/button/style/css"], root["antd/lib/checkbox"], root["antd/lib/checkbox/style/css"], root["antd/lib/form"], root["antd/lib/form/style/css"], root["antd/lib/icon"], root["antd/lib/icon/style/css"], root["antd/lib/input"], root["antd/lib/input/style/css"], root["babel-runtime/helpers/asyncToGenerator"], root["dva-loading"], root["dva/fetch"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_52__, __WEBPACK_EXTERNAL_MODULE_53__, __WEBPACK_EXTERNAL_MODULE_54__, __WEBPACK_EXTERNAL_MODULE_55__, __WEBPACK_EXTERNAL_MODULE_56__, __WEBPACK_EXTERNAL_MODULE_57__, __WEBPACK_EXTERNAL_MODULE_58__, __WEBPACK_EXTERNAL_MODULE_59__, __WEBPACK_EXTERNAL_MODULE_60__, __WEBPACK_EXTERNAL_MODULE_61__, __WEBPACK_EXTERNAL_MODULE_62__, __WEBPACK_EXTERNAL_MODULE_63__, __WEBPACK_EXTERNAL_MODULE_64__) {
return webpackJsonpApp([2],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _dva = __webpack_require__(2);

	var _dva2 = _interopRequireDefault(_dva);

	var _dvaLoading = __webpack_require__(63);

	var _dvaLoading2 = _interopRequireDefault(_dvaLoading);

	var _router = __webpack_require__(3);

	__webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 1. Initialize
	var app = (0, _dva2.default)({
	  history: _router.hashHistory
	});

	// 2. Plugins
	app.use((0, _dvaLoading2.default)());

	// 3. Model
	app.model(__webpack_require__(20));

	// 4. Router
	app.router(__webpack_require__(24).RouterConfig);

	// 5. Start
	app.start('#root');

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _regenerator = __webpack_require__(13);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _account = __webpack_require__(21);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  namespace: 'account',
	  state: {},

	  effects: {
	    login: _regenerator2.default.mark(function login(_ref, _ref2) {
	      var payload = _ref.payload;
	      var call = _ref2.call;

	      var _ref3, data, window;

	      return _regenerator2.default.wrap(function login$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _context.next = 2;
	              return call(_account.login, payload);

	            case 2:
	              _ref3 = _context.sent;
	              data = _ref3.data;

	              if (!(data.Code === 0)) {
	                _context.next = 9;
	                break;
	              }

	              window = window || {};

	              window.location = data.ReturnUrl;
	              _context.next = 10;
	              break;

	            case 9:
	              throw data;

	            case 10:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, login, this);
	    })
	  },
	  reducers: {}
	};
	module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.login = undefined;

	var _regenerator = __webpack_require__(13);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(62);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var login = exports.login = function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(payload) {
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            return _context.abrupt('return', (0, _request2.default)('/api/account/login', {
	              method: 'post',
	              data: payload
	            }));

	          case 1:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function login(_x) {
	    return _ref.apply(this, arguments);
	  };
	}();

	var _request = __webpack_require__(22);

	var _request2 = _interopRequireDefault(_request);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = request;

	var _fetch = __webpack_require__(64);

	var _fetch2 = _interopRequireDefault(_fetch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function parseJSON(response) {
	  return response.json();
	}

	function checkStatus(response) {
	  if (response.status >= 200 && response.status < 300) {
	    return response;
	  }

	  var error = new Error(response.statusText);
	  error.response = response;
	  throw error;
	}

	/**
	 * Requests a URL, returning a promise.
	 *
	 * @param  {string} url       The URL we want to request
	 * @param  {object} [options] The options we want to pass to "fetch"
	 * @return {object}           An object containing either "data" or "err"
	 */
	function request(url, options) {
	  return (0, _fetch2.default)(url, options).then(checkStatus).then(parseJSON).then(function (data) {
	    return { data: data };
	  }).catch(function (err) {
	    return { err: err };
	  });
	}
	module.exports = exports['default'];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _css = __webpack_require__(53);

	var _button = __webpack_require__(52);

	var _button2 = _interopRequireDefault(_button);

	var _css2 = __webpack_require__(55);

	var _checkbox = __webpack_require__(54);

	var _checkbox2 = _interopRequireDefault(_checkbox);

	var _css3 = __webpack_require__(57);

	var _form = __webpack_require__(56);

	var _form2 = _interopRequireDefault(_form);

	var _css4 = __webpack_require__(61);

	var _input = __webpack_require__(60);

	var _input2 = _interopRequireDefault(_input);

	var _css5 = __webpack_require__(59);

	var _icon = __webpack_require__(58);

	var _icon2 = _interopRequireDefault(_icon);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _dva = __webpack_require__(2);

	var _Login = __webpack_require__(51);

	var _Login2 = _interopRequireDefault(_Login);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Login = function Login(props) {
	  var loading = props.loading,
	      dispatch = props.dispatch;
	  var _props$form = props.form,
	      getFieldDecorator = _props$form.getFieldDecorator,
	      validateFieldsAndScroll = _props$form.validateFieldsAndScroll;


	  function handleOk(e) {
	    validateFieldsAndScroll(function (errors, values) {
	      if (errors) {
	        e.preventDefault();
	      } else {
	        dispatch({ type: 'account/login', payload: values });
	      }
	    });
	  }

	  return _react2.default.createElement(
	    'div',
	    { className: _Login2.default.form },
	    _react2.default.createElement(
	      'div',
	      { className: _Login2.default.logo },
	      _react2.default.createElement('img', { alt: 'logo', src: 'https://t.alipayobjects.com/images/T1QUBfXo4fXXXXXXXX.png' }),
	      _react2.default.createElement(
	        'span',
	        null,
	        'CoreCRM'
	      )
	    ),
	    _react2.default.createElement(
	      _form2.default,
	      { onSubmit: handleOk },
	      _react2.default.createElement(
	        _form2.default.Item,
	        { hasFeedback: true },
	        getFieldDecorator('Account', {
	          rules: [{
	            required: true,
	            message: '请输入您的用户名或邮箱'
	          }]
	        })(_react2.default.createElement(_input2.default, { prefix: _react2.default.createElement(_icon2.default, { type: 'user', style: { fontSize: 13 } }), size: 'large', placeholder: '\u7528\u6237\u540D/\u90AE\u7BB1' }))
	      ),
	      _react2.default.createElement(
	        _form2.default.Item,
	        { hasFeedback: true },
	        getFieldDecorator('Password', {
	          rules: [{
	            required: true,
	            message: '请输入密码'
	          }]
	        })(_react2.default.createElement(_input2.default, { prefix: _react2.default.createElement(_icon2.default, { type: 'lock', style: { fontSize: 13 } }), size: 'large', type: 'password', placeholder: '\u5BC6\u7801' }))
	      ),
	      _react2.default.createElement(
	        _form2.default.Item,
	        null,
	        getFieldDecorator('RememberThisWeek', {
	          valuePropName: 'checked',
	          initialValue: true
	        })(_react2.default.createElement(
	          _checkbox2.default,
	          null,
	          '\u672C\u5468\u4E0D\u7528\u767B\u5F55'
	        )),
	        _react2.default.createElement(
	          _button2.default,
	          { type: 'primary', size: 'large', loading: loading, htmlType: 'submit' },
	          '\u767B\u5F55'
	        )
	      )
	    )
	  );
	};

	Login.propTypes = {
	  form: _react.PropTypes.object,
	  loading: _react.PropTypes.bool,
	  dispatch: _react.PropTypes.func
	};

	exports.default = (0, _dva.connect)(function (state) {
	  return { loading: state.loading.models.account };
	})(_form2.default.create()(Login));
	module.exports = exports['default'];

/***/ }),
/* 24 */
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

	var _Login = __webpack_require__(23);

	var _Login2 = _interopRequireDefault(_Login);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routes = exports.routes = _react2.default.createElement(
	  _router.Route,
	  { path: '/' },
	  _react2.default.createElement(_router.IndexRedirect, { to: '/login' }),
	  _react2.default.createElement(_router.Route, { path: 'login', component: _Login2.default })
	);

	function RouterConfig(_ref) {
	  var history = _ref.history;

	  return _react2.default.createElement(
	    _router.Router,
	    { history: history },
	    routes
	  );
	}

/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"form":"form___2SlUN","logo":"logo___1AF-w","ant-spin-container":"ant-spin-container___2wIXz","ant-spin-nested-loading":"ant-spin-nested-loading___3kqtV"};

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	module.exports = require("antd/lib/button");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	module.exports = require("antd/lib/button/style/css");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

	module.exports = require("antd/lib/checkbox");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

	module.exports = require("antd/lib/checkbox/style/css");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

	module.exports = require("antd/lib/form");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

	module.exports = require("antd/lib/form/style/css");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

	module.exports = require("antd/lib/icon");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

	module.exports = require("antd/lib/icon/style/css");

/***/ }),
/* 60 */
/***/ (function(module, exports) {

	module.exports = require("antd/lib/input");

/***/ }),
/* 61 */
/***/ (function(module, exports) {

	module.exports = require("antd/lib/input/style/css");

/***/ }),
/* 62 */
/***/ (function(module, exports) {

	module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 63 */
/***/ (function(module, exports) {

	module.exports = require("dva-loading");

/***/ }),
/* 64 */
/***/ (function(module, exports) {

	module.exports = require("dva/fetch");

/***/ })
])
});
;