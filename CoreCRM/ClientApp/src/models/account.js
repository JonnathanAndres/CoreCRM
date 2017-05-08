import { login } from '../services/account';

export default {
  namespace: 'account',
  state: {
  },

  effects: {
    *login({
      payload,
    }, { call }) {
      const data = yield call(login, payload);

      if (data.success) {
        // Redirect to /User/Dashboard
      } else {
        throw data;
      }
    },
  },
  reducers: {
  },
};
