/* eslint-env browser */

const modelInitialState = {
  menus: {},
};

export default {
  namespace: 'dev',
  state: modelInitialState,
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'init', payload: modelInitialState });

      return history.listen(({ pathname }) => {
        const re = /(\/[^/]*)(\/[^/]*)?/;
        const matched = pathname.match(re);
        if (matched !== null) {
          dispatch({ type: 'updateSideMenus', payload: matched[1] });
        } else {
          dispatch({ type: 'updateSideMenus', payload: '/Home' });
        }
      });
    },
  },
  effects: {
    *updateSideMenus({ payload }, { put, select }) {
      const menus = yield select(state => state.dev.menus);
      const root = menus[payload] === undefined ? '/Home' : payload;
      const sideMenus = menus[root];
      sideMenus.route = root;
      yield put({ type: 'app/updateSideMenus', sideMenus });
    },
  },
  reducers: {
    init(state, { payload }) {
      return {
        ...payload,
        ...state,
      };
    },
  },
};
