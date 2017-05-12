import axios from 'axios';
import qs from 'qs';
import jsonp from 'jsonp';
import lodash from 'lodash';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import { baseURL } from './config';

axios.defaults.baseURL = baseURL;

const fetch = (options) => {
  const {
    method = 'get',
    fetchType,
  } = options;

  let {
    data,
    url,
  } = options;

  const cloneData = lodash.cloneDeep(data);

  try {
    let domin = '';
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0];
      url = url.slice(domin.length);
    }
    const match = pathToRegexp.parse(url);
    url = pathToRegexp.compile(url)(data);
    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = domin + url;
  } catch (e) {
    message.error(e.message);
  }

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: `${qs.stringify(data)}&callback`,
        name: `jsonp_${new Date().getTime()}`,
        timeout: 4000,
      }, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve({ statusText: 'OK', status: 200, data: result });
      });
    });
  } else if (fetchType === 'YQL') {
    url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${options.url}?${qs.stringify(options.data)}'&format=json`;
    data = null;
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      });
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      });
    case 'post':
      return axios.post(url, cloneData);
    case 'put':
      return axios.put(url, cloneData);
    case 'patch':
      return axios.patch(url, cloneData);
    default:
      return axios(options);
  }
};

export default function request(options) {
  return fetch(options).then((response) => {
    const { statusText, status } = response;
    const data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data;
    return {
      success: true,
      message: statusText,
      status,
      ...data,
    };
  }).catch((error) => {
    const { response } = error;
    let msg;
    let status;
    let otherData = {};
    if (response) {
      const { data, statusText } = response;
      otherData = data;
      status = response.status;
      msg = data.message || statusText;
    } else {
      status = 600;
      msg = 'Network Error';
    }
    return { success: false, status, message: msg, ...otherData };
  });
}
