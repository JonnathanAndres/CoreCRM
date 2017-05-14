/* eslint-env browser */
import config from './config';
import request from './request';
import { color } from './theme';

// 连字符转驼峰
String.prototype.hyphenToHump = function hypenToHump() { // eslint-disable-line no-extend-native
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase();
  });
};

// 驼峰转连字符
String.prototype.humpToHyphen = function humpToHyphen() { // eslint-disable-line no-extend-native
  return this.replace(/([A-Z])/g, '-$1').toLowerCase();
};

// 日期格式化
Date.prototype.format = function formatDate(format) { // eslint-disable-line no-extend-native
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  };

  let formatted = '';
  if (/(y+)/.test(format)) {
    formatted = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      formatted = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length));
    }
  }
  return formatted;
};

/**
 * 把 routes 的定义转换成 menu tree
 * @param   {object} routes routes 的定义
 * @param   {object} metadata menu 的元信息
 * @return  {object}
 */
const routesToMenus = (routes, metadata) => {
  function recursive(parent, children) {
    if (children instanceof Array) {
      children.forEach((child, index) => {
        const isRoute = child.type.displayName === 'Route';
        const hasPath = child.props.path !== undefined;
        if (isRoute && hasPath) {
          const route = `${parent.route}${parent.route.endsWith('/') ? '' : '/'}${child.props.path}`;
          let menu = { id: (parent.id * 100) + index, route, ...metadata[route] };
          if (child.props.children !== undefined) {
            menu.children = [];
            menu = recursive(menu, child.props.children);
          }
          parent.children.push(menu);
        }
      });
    } else {
      delete parent.children; // eslint-disable-line no-param-reassign
    }
    return parent;
  }
  const root = { route: '/', id: 1, children: [], ...metadata['/'] };
  return recursive(root, routes.props.children);
};

module.exports = {
  config,
  request,
  color,
  routesToMenus,
};
