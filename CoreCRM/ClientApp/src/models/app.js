/* eslint-env browser */
import { logout } from '../services/account';
import { prefix } from '../utils/config';

export default {
  namespace: 'app',
  state: {
    user: {},
    menuPopoverVisible: false,
    siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',
    isNavbar: typeof document === 'object' ? document.body.clientWidth < 769 : false,
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],
  },
  subscriptions: {
    setup(/* { dispatch } */) {
      // dispatch({ type: 'query' });
    },
  },
  effects: {
    *logout({
      payload,
    }, { call, put }) {
      const data = yield call(logout);
      if (data.success) {
        yield put({ type: 'query' });
      } else {
        throw (data);
      }
    },
  },
  reducers: {
    switchSider(state) {
      localStorage.setItem(`${prefix}siderFold`, !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold,
      };
    },
  },
};
