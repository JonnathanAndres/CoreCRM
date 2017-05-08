import request from '../utils/request';

export async function login(payload) {
  return request('/api/account/login', {
    method: 'post',
    data: payload,
  });
}
