/* eslint-env browser */
import { logout } from '../services/account';
import localStorageKeys from '../utils/localStorageKeys';

const modelInitialState = {
  user: {},
  menuPopoverVisible: false,
  siderFold: false,
  isNavbar: false,
  isDev: false,
  navOpenKeys: [],
  mainMenus: [],
  sideMenus: {},
  breads: [],
};

export default {
  namespace: 'app',
  state: modelInitialState,
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'init', payload: modelInitialState });
    },
  },
  effects: {
    *logout({
      payload,
    }, { call }) {
      const data = yield call(logout);
      if (data.success) {
        // Redirect to login.
        window.location = '/Account/Login';
      } else {
        // TODO: show a message here.
        // It should not be here often.
        throw (data);
      }
    },
  },
  reducers: {
    init(state, { payload }) {
      return {
        ...payload,
        ...state,
      };
    },
    switchSider(state) {
      localStorage.setItem(localStorageKeys.siderFold, !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold,
      };
    },
    updateSideMenus(state, { sideMenus }) {
      return {
        ...state,
        sideMenus,
      };
    },
  },
};
