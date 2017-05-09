(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("antd/lib/layout"), require("antd/lib/layout/style/css"), require("antd/lib/menu"), require("antd/lib/menu/style/css"), require("dva"), require("dva/router"), require("react"), require("react-dom/server"), require("babel-runtime/helpers/extends"), require("babel-runtime/regenerator"), require("babel-runtime/helpers/typeof"), require("aspnet-prerendering"), require("babel-runtime/core-js/promise"), require("react-router"));
	else if(typeof define === 'function' && define.amd)
		define(["antd/lib/layout", "antd/lib/layout/style/css", "antd/lib/menu", "antd/lib/menu/style/css", "dva", "dva/router", "react", "react-dom/server", "babel-runtime/helpers/extends", "babel-runtime/regenerator", "babel-runtime/helpers/typeof", "aspnet-prerendering", "babel-runtime/core-js/promise", "react-router"], factory);
	else if(typeof exports === 'object')
		exports["BootServer"] = factory(require("antd/lib/layout"), require("antd/lib/layout/style/css"), require("antd/lib/menu"), require("antd/lib/menu/style/css"), require("dva"), require("dva/router"), require("react"), require("react-dom/server"), require("babel-runtime/helpers/extends"), require("babel-runtime/regenerator"), require("babel-runtime/helpers/typeof"), require("aspnet-prerendering"), require("babel-runtime/core-js/promise"), require("react-router"));
	else
		root["BootServer"] = factory(root["antd/lib/layout"], root["antd/lib/layout/style/css"], root["antd/lib/menu"], root["antd/lib/menu/style/css"], root["dva"], root["dva/router"], root["react"], root["react-dom/server"], root["babel-runtime/helpers/extends"], root["babel-runtime/regenerator"], root["babel-runtime/helpers/typeof"], root["aspnet-prerendering"], root["babel-runtime/core-js/promise"], root["react-router"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/layout");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/layout/style/css");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/menu");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/menu/style/css");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("dva");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("dva/router");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/extends");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/typeof");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof2 = __webpack_require__(11);

var _typeof3 = _interopRequireDefault2(_typeof2);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function webpackUniversalModuleDefinition(root, factory) {
	if (( false ? 'undefined' : (0, _typeof3.default)(exports)) === 'object' && ( false ? 'undefined' : (0, _typeof3.default)(module)) === 'object') module.exports = factory(__webpack_require__(6), __webpack_require__(4), __webpack_require__(5), __webpack_require__(0), __webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(7));else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6), __webpack_require__(4), __webpack_require__(5), __webpack_require__(0), __webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === 'object') exports["BootServer"] = factory(require("react"), require("dva"), require("dva/router"), require("antd/lib/layout"), require("antd/lib/layout/style/css"), require("antd/lib/menu"), require("antd/lib/menu/style/css"), require("react-dom/server"));else root["BootServer"] = factory(root["react"], root["dva"], root["dva/router"], root["antd/lib/layout"], root["antd/lib/layout/style/css"], root["antd/lib/menu"], root["antd/lib/menu/style/css"], root["react-dom/server"]);
})(undefined, function (__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__) {
	return (/******/function (modules) {
			// webpackBootstrap
			/******/ // The module cache
			/******/var installedModules = {};

			/******/ // The require function
			/******/function __webpack_require__(moduleId) {

				/******/ // Check if module is in cache
				/******/if (installedModules[moduleId])
					/******/return installedModules[moduleId].exports;

				/******/ // Create a new module (and put it into the cache)
				/******/var module = installedModules[moduleId] = {
					/******/exports: {},
					/******/id: moduleId,
					/******/loaded: false
					/******/ };

				/******/ // Execute the module function
				/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

				/******/ // Flag the module as loaded
				/******/module.loaded = true;

				/******/ // Return the exports of the module
				/******/return module.exports;
				/******/
			}

			/******/ // expose the modules object (__webpack_modules__)
			/******/__webpack_require__.m = modules;

			/******/ // expose the module cache
			/******/__webpack_require__.c = installedModules;

			/******/ // __webpack_public_path__
			/******/__webpack_require__.p = "/";

			/******/ // Load entry module and return exports
			/******/return __webpack_require__(0);
			/******/
		}(
		/************************************************************************/
		/******/[
		/* 0 */
		/***/function (module, exports, __webpack_require__) {

			module.exports = __webpack_require__(15);

			/***/
		},
		/* 1 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(6);

			/***/
		},
		/* 2 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(4);

			/***/
		},
		/* 3 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(5);

			/***/
		},
		/* 4 */
		/***/function (module, exports) {

			// removed by extract-text-webpack-plugin
			module.exports = { "header": "header___16QSy", "footer": "footer___1pUix", "content": "content___1rXXt", "logo": "logo___Gb1wi" };

			/***/
		},
		/* 5 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var _css = __webpack_require__(10);

			var _layout = __webpack_require__(9);

			var _layout2 = _interopRequireDefault(_layout);

			var _react = __webpack_require__(1);

			var _react2 = _interopRequireDefault(_react);

			var _NavigationBar = __webpack_require__(6);

			var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

			var _Layout = __webpack_require__(4);

			var _Layout2 = _interopRequireDefault(_Layout);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			var Header = _layout2.default.Header,
			    Footer = _layout2.default.Footer,
			    Content = _layout2.default.Content;

			var Layout = function Layout(props) {
				return _react2.default.createElement(_layout2.default, { className: _Layout2.default.layout }, _react2.default.createElement(Header, { className: _Layout2.default.header }, _react2.default.createElement('div', { className: _Layout2.default.logo }, 'CoreCRM'), _react2.default.createElement(_NavigationBar2.default, null)), _react2.default.createElement(Content, { className: _Layout2.default.content }, props.children), _react2.default.createElement(Footer, { className: _Layout2.default.footer }, 'CoreCRM \u7248\u6743\u6240\u6709 \xA92017'));
			};

			Layout.propTypes = {};

			exports.default = Layout;
			module.exports = exports['default'];

			/***/
		},
		/* 6 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var _css = __webpack_require__(12);

			var _menu = __webpack_require__(11);

			var _menu2 = _interopRequireDefault(_menu);

			var _react = __webpack_require__(1);

			var _react2 = _interopRequireDefault(_react);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			var NavigationBar = function NavigationBar() {
				return _react2.default.createElement(_menu2.default, {
					theme: 'dark',
					mode: 'horizontal',
					defaultSelectedKeys: ['2'],
					style: { lineHeight: '64px' }
				}, _react2.default.createElement(_menu2.default.Item, { key: '1' }, 'nav 1'), _react2.default.createElement(_menu2.default.Item, { key: '2' }, 'nav 2'), _react2.default.createElement(_menu2.default.Item, { key: '3' }, 'nav 3'));
			};

			NavigationBar.propTypes = {};

			exports.default = NavigationBar;
			module.exports = exports['default'];

			/***/
		},
		/* 7 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var _react = __webpack_require__(1);

			var _react2 = _interopRequireDefault(_react);

			var _dva = __webpack_require__(2);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			// import styles from './Index.css';

			function Index() {
				return _react2.default.createElement('div', null, 'Home/Index');
			}

			Index.propTypes = {};

			exports.default = (0, _dva.connect)()(Index);
			module.exports = exports['default'];

			/***/
		},
		/* 8 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});
			exports.routes = undefined;
			exports.RouterConfig = RouterConfig;

			var _react = __webpack_require__(1);

			var _react2 = _interopRequireDefault(_react);

			var _router = __webpack_require__(3);

			var _Layout = __webpack_require__(5);

			var _Layout2 = _interopRequireDefault(_Layout);

			var _Index = __webpack_require__(7);

			var _Index2 = _interopRequireDefault(_Index);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			var routes = exports.routes = _react2.default.createElement(_router.Route, { component: _Layout2.default }, _react2.default.createElement(_router.IndexRoute, { component: _Index2.default }));

			function RouterConfig(_ref) {
				var history = _ref.history;

				return _react2.default.createElement(_router.Router, { history: history }, routes);
			}

			/***/
		},
		/* 9 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(0);

			/***/
		},
		/* 10 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(1);

			/***/
		},
		/* 11 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(2);

			/***/
		},
		/* 12 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(3);

			/***/
		},
		/* 13 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(7);

			/***/
		},,
		/* 14 */
		/* 15 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});
			exports.routes = undefined;
			exports.renderHTML = renderHTML;

			var _react = __webpack_require__(1);

			var _react2 = _interopRequireDefault(_react);

			var _server = __webpack_require__(13);

			var _dva = __webpack_require__(2);

			var _dva2 = _interopRequireDefault(_dva);

			var _router = __webpack_require__(3);

			var _router2 = __webpack_require__(8);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			function renderHTML(initialState, renderProps) {
				// 1. Initialize
				var app = (0, _dva2.default)({
					history: (0, _router.createMemoryHistory)(),
					initialState: initialState
				});

				// 2. Plugins
				// app.use({});

				// 3. Model

				// 4. Router
				app.router(function (_ref) {
					var routerRenderProps = _ref.routerRenderProps;

					return _react2.default.createElement(_router.RouterContext, routerRenderProps);
				});

				return (0, _server.renderToString)(app.start()({ routerRenderProps: renderProps }));
			}

			var routes = exports.routes = _router2.routes;

			/***/
		}])
	);
});
;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof2 = __webpack_require__(11);

var _typeof3 = _interopRequireDefault2(_typeof2);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function webpackUniversalModuleDefinition(root, factory) {
	if (( false ? 'undefined' : (0, _typeof3.default)(exports)) === 'object' && ( false ? 'undefined' : (0, _typeof3.default)(module)) === 'object') module.exports = factory(__webpack_require__(6), __webpack_require__(4), __webpack_require__(5), __webpack_require__(0), __webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(7), __webpack_require__(8), __webpack_require__(9));else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6), __webpack_require__(4), __webpack_require__(5), __webpack_require__(0), __webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(7), __webpack_require__(8), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === 'object') exports["BootServer"] = factory(require("react"), require("dva"), require("dva/router"), require("antd/lib/layout"), require("antd/lib/layout/style/css"), require("antd/lib/menu"), require("antd/lib/menu/style/css"), require("react-dom/server"), require("babel-runtime/helpers/extends"), require("babel-runtime/regenerator"));else root["BootServer"] = factory(root["react"], root["dva"], root["dva/router"], root["antd/lib/layout"], root["antd/lib/layout/style/css"], root["antd/lib/menu"], root["antd/lib/menu/style/css"], root["react-dom/server"], root["babel-runtime/helpers/extends"], root["babel-runtime/regenerator"]);
})(undefined, function (__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_17__, __WEBPACK_EXTERNAL_MODULE_18__) {
	return (/******/function (modules) {
			// webpackBootstrap
			/******/ // The module cache
			/******/var installedModules = {};

			/******/ // The require function
			/******/function __webpack_require__(moduleId) {

				/******/ // Check if module is in cache
				/******/if (installedModules[moduleId])
					/******/return installedModules[moduleId].exports;

				/******/ // Create a new module (and put it into the cache)
				/******/var module = installedModules[moduleId] = {
					/******/exports: {},
					/******/id: moduleId,
					/******/loaded: false
					/******/ };

				/******/ // Execute the module function
				/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

				/******/ // Flag the module as loaded
				/******/module.loaded = true;

				/******/ // Return the exports of the module
				/******/return module.exports;
				/******/
			}

			/******/ // expose the modules object (__webpack_modules__)
			/******/__webpack_require__.m = modules;

			/******/ // expose the module cache
			/******/__webpack_require__.c = installedModules;

			/******/ // __webpack_public_path__
			/******/__webpack_require__.p = "/";

			/******/ // Load entry module and return exports
			/******/return __webpack_require__(0);
			/******/
		}(
		/************************************************************************/
		/******/[
		/* 0 */
		/***/function (module, exports, __webpack_require__) {

			module.exports = __webpack_require__(16);

			/***/
		},
		/* 1 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(6);

			/***/
		},
		/* 2 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(4);

			/***/
		},
		/* 3 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(5);

			/***/
		},
		/* 4 */
		/***/function (module, exports) {

			// removed by extract-text-webpack-plugin
			module.exports = { "header": "header___16QSy", "footer": "footer___1pUix", "content": "content___1rXXt", "logo": "logo___Gb1wi" };

			/***/
		},
		/* 5 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var _css = __webpack_require__(10);

			var _layout = __webpack_require__(9);

			var _layout2 = _interopRequireDefault(_layout);

			var _react = __webpack_require__(1);

			var _react2 = _interopRequireDefault(_react);

			var _NavigationBar = __webpack_require__(6);

			var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

			var _Layout = __webpack_require__(4);

			var _Layout2 = _interopRequireDefault(_Layout);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			var Header = _layout2.default.Header,
			    Footer = _layout2.default.Footer,
			    Content = _layout2.default.Content;

			var Layout = function Layout(props) {
				return _react2.default.createElement(_layout2.default, { className: _Layout2.default.layout }, _react2.default.createElement(Header, { className: _Layout2.default.header }, _react2.default.createElement('div', { className: _Layout2.default.logo }, 'CoreCRM'), _react2.default.createElement(_NavigationBar2.default, null)), _react2.default.createElement(Content, { className: _Layout2.default.content }, props.children), _react2.default.createElement(Footer, { className: _Layout2.default.footer }, 'CoreCRM \u7248\u6743\u6240\u6709 \xA92017'));
			};

			Layout.propTypes = {};

			exports.default = Layout;
			module.exports = exports['default'];

			/***/
		},
		/* 6 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var _css = __webpack_require__(12);

			var _menu = __webpack_require__(11);

			var _menu2 = _interopRequireDefault(_menu);

			var _react = __webpack_require__(1);

			var _react2 = _interopRequireDefault(_react);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			var NavigationBar = function NavigationBar() {
				return _react2.default.createElement(_menu2.default, {
					theme: 'dark',
					mode: 'horizontal',
					defaultSelectedKeys: ['2'],
					style: { lineHeight: '64px' }
				}, _react2.default.createElement(_menu2.default.Item, { key: '1' }, 'nav 1'), _react2.default.createElement(_menu2.default.Item, { key: '2' }, 'nav 2'), _react2.default.createElement(_menu2.default.Item, { key: '3' }, 'nav 3'));
			};

			NavigationBar.propTypes = {};

			exports.default = NavigationBar;
			module.exports = exports['default'];

			/***/
		},
		/* 7 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var _react = __webpack_require__(1);

			var _react2 = _interopRequireDefault(_react);

			var _dva = __webpack_require__(2);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			// import styles from './Index.css';

			function Index() {
				return _react2.default.createElement('div', null, 'Home/Index');
			}

			Index.propTypes = {};

			exports.default = (0, _dva.connect)()(Index);
			module.exports = exports['default'];

			/***/
		},
		/* 8 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});
			exports.routes = undefined;
			exports.RouterConfig = RouterConfig;

			var _react = __webpack_require__(1);

			var _react2 = _interopRequireDefault(_react);

			var _router = __webpack_require__(3);

			var _Layout = __webpack_require__(5);

			var _Layout2 = _interopRequireDefault(_Layout);

			var _Index = __webpack_require__(7);

			var _Index2 = _interopRequireDefault(_Index);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			var routes = exports.routes = _react2.default.createElement(_router.Route, { component: _Layout2.default }, _react2.default.createElement(_router.IndexRoute, { component: _Index2.default }));

			function RouterConfig(_ref) {
				var history = _ref.history;

				return _react2.default.createElement(_router.Router, { history: history }, routes);
			}

			/***/
		},
		/* 9 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(0);

			/***/
		},
		/* 10 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(1);

			/***/
		},
		/* 11 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(2);

			/***/
		},
		/* 12 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(3);

			/***/
		},
		/* 13 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(7);

			/***/
		},
		/* 14 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var _extends2 = __webpack_require__(17);

			var _extends3 = _interopRequireDefault(_extends2);

			var _regenerator = __webpack_require__(18);

			var _regenerator2 = _interopRequireDefault(_regenerator);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			exports.default = {
				namespace: 'navigationBar',

				state: {},

				subscriptions: {
					setup: function setup(_ref) {
						// eslint-disable-line

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

			/***/
		},,
		/* 15 */
		/* 16 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});
			exports.routes = undefined;
			exports.renderHTML = renderHTML;

			var _react = __webpack_require__(1);

			var _react2 = _interopRequireDefault(_react);

			var _server = __webpack_require__(13);

			var _dva = __webpack_require__(2);

			var _dva2 = _interopRequireDefault(_dva);

			var _router = __webpack_require__(3);

			var _router2 = __webpack_require__(8);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			function renderHTML(initialState, renderProps) {
				// 1. Initialize
				var app = (0, _dva2.default)({
					history: (0, _router.createMemoryHistory)(),
					initialState: initialState
				});

				// 2. Plugins
				// app.use({});

				// 3. Model
				app.model(__webpack_require__(14)); // eslint-disable-line

				// 4. Router
				app.router(function (_ref) {
					var routerRenderProps = _ref.routerRenderProps;

					return _react2.default.createElement(_router.RouterContext, routerRenderProps);
				});

				return (0, _server.renderToString)(app.start()({ routerRenderProps: renderProps }));
			}

			var routes = exports.routes = _router2.routes;

			/***/
		},
		/* 17 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(8);

			/***/
		},
		/* 18 */
		/***/function (module, exports) {

			module.exports = __webpack_require__(9);

			/***/
		}])
	);
});
;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("aspnet-prerendering");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(15);

var _promise2 = _interopRequireDefault(_promise);

var _reactRouter = __webpack_require__(16);

var _aspnetPrerendering = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var servers = {
  Home: __webpack_require__(13).BootServer,
  Account: __webpack_require__(12).BootServer
};

exports.default = (0, _aspnetPrerendering.createServerRenderer)(function (params) {
  return new _promise2.default(function (resolve) {
    var re = /^\/([^/]*)(.*)/;
    var matched = params.location.path.match(re);
    var controller = matched === null || matched[1] === '' ? 'Home' : matched[1];
    var clientRoute = matched === null || matched[2] === '' ? '/' : matched[2];

    var BootServer = servers[controller] || Home;

    (0, _reactRouter.match)({
      routes: BootServer.routes,
      location: clientRoute
    }, function (err, redirectLocation, renderProps) {
      if (err) throw new Error('Route match failed: ' + err);
      if (redirectLocation) throw new Error('I don\'t know how to redirect: ' + redirectLocation + '.');

      var initialState = params.data || {};
      resolve({ html: BootServer.renderHTML(initialState, renderProps) });
    });
  });
});

/***/ })
/******/ ]);
});