/* eslint-env browser */
import localStorageKeys from '../../utils/localStorageKeys';

export default {
  app: {
    siderFold: localStorage.getItem(localStorageKeys.siderFold) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem(localStorageKeys.navOpenKeys)) || [],
  },
};
