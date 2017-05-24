/* eslint-env browser */

const modelInitialState = {

};

export default {
  namespace: 'user',
  state: modelInitialState,
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'init', payload: modelInitialState });
    },
  },
  effects: {

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
