import request from '../utils/request';

export async function login(payload) {
  return request('/api/account/login', {
    method: 'post',
    data: payload,
  });
}

export async function logout() {
  return request('/api/account/logout', {
    method: 'post',
  });
}
