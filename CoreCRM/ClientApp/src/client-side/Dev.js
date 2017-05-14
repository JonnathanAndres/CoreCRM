/* eslint-env browser */
/* eslint-disable global-require */
import dva from 'dva';
import createLoading from 'dva-loading';
import { hashHistory } from 'dva/router';
import initState from './init/state';
import '../views/Shared/Shared.css';

// 1. Initialize
const app = dva({
  history: hashHistory,
  initialState: {
    app: {
      ...initState.app,
      isDev: true,
      mainMenus: [
        { name: 'Home', icon: 'home', route: '/Home' },
        { name: 'User', icon: 'user', route: '/User' },
      ],
      breads: [
        { name: 'Home', icon: 'home', route: '/Home' },
        { name: 'Dashboard', icon: 'home' },
      ],
    },
    dev: {
      menus: {
        '/Home': require('../views/Home/router').menus,
        '/User': require('../views/User/router').menus,
      },
    },
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('../models/app'));
app.model(require('../models/dev'));
app.model(require('../models/account'));

// 4. Router
app.router(require('../views/Dev/router').RouterConfig);

// 5. Start
app.start('#root');
