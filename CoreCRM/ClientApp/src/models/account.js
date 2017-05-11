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

      if (data.code === 0) {
        window.location = RETURN_URL || '/Home'; // eslint-disable-line no-undef
      } else {
        throw data.errors;
      }
    },
  },
  reducers: {
  },
};
