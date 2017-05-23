/* eslint-env browser */
import { logout } from '../services/account';
import localStorageKeys from '../utils/localStorageKeys';

const modelInitialState = {
  user: {},
  siderCollapsed: false,
  isDev: false,
  mainMenus: [],
  sideMenus: {},
  breads: [],
  selectedMainMenuKeys: [],
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
      // TODO: init with INITIAL_STATE
      const selectedMainMenuKeys = state.mainMenus
                                        .map(menu => (menu.selected ? `main-menu-${menu.name}` : false))
                                        .filter(menu => menu !== false);
      return {
        ...payload,
        ...state,
        selectedMainMenuKeys,
      };
    },
    toggleSider(state) {
      localStorage.setItem(localStorageKeys.siderCollapsed, !state.siderCollapsed);
      return {
        ...state,
        siderCollapsed: !state.siderCollapsed,
      };
    },
    changeMainMenu(state, { key }) {
      return {
        ...state,
        selectedMainMenuKeys: [key],
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
