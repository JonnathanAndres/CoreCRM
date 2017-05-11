import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
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
export default function request(url, options) {
  let fetchOptions = options;
  if (typeof options.data === 'object') {
    fetchOptions = {
      body: JSON.stringify(options.data),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': REQUEST_VERIFICATION_TOKEN, // eslint-disable-line no-undef
      },
      credentials: 'same-origin',
      ...options,
    };
  }

  return fetch(url, fetchOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
