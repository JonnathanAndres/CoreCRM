/* eslint-env browser */
import localStorageKeys from '../../utils/localStorageKeys';

export default {
  app: {
    siderCollapsed: localStorage.getItem(localStorageKeys.siderCollapsed) === 'true',
  },
};
