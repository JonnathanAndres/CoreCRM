(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("aspnet-prerendering"), require("react-router"));
	else if(typeof define === 'function' && define.amd)
		define(["aspnet-prerendering", "react-router"], factory);
	else if(typeof exports === 'object')
		exports["BootServer"] = factory(require("aspnet-prerendering"), require("react-router"));
	else
		root["BootServer"] = factory(root["aspnet-prerendering"], root["react-router"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 0;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("aspnet-prerendering");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var { match } = __webpack_require__(2);
var { createServerRenderer } = __webpack_require__(1);

module.exports = createServerRenderer(function(params) {
    return new Promise(function (resolve, reject) {
        var re = /^\/([^\/]*)\/?([^\/]*)\??/;
        var matched = params.location.path.match(re);
        var controller = matched[1];
        var action = matched[2] !== '' ? matched[2] : 'Index';
        //var codeFile = './dist/' + controller + action;
        var codeFile = './dist/server/Index';
        var App = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());

        match({
            routes: App.routes,
            location: params.location.path
        }, function (err, redirectLocation, renderProps) {
            if (err) throw new Error("Route match failed: " + err);

            if (redirectLocation) new Error("I don't know how to redirect.");

            var initialState = {};
            resolve({ html: App.renderHTML(initialState, renderProps)});
        })
    });
});

/***/ })
/******/ ]);
});