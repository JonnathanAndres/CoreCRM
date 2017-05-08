import { login } from '../services/account';

export default {
  namespace: 'account',
  state: {
  },

  effects: {
    *login({
      payload,
    }, { call }) {
      const { data } = yield call(login, payload);

      if (data.Code === 0) {
        const window = window || {};
        window.location = data.ReturnUrl;
      } else {
        throw data;
      }
    },
  },
  reducers: {
  },
};
