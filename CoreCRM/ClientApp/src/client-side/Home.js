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

      // TODO mainMenus should come from global INITIAL_STATE
      mainMenus: [
        { name: 'Home', icon: 'home', route: '/Home' },
        { name: 'User', icon: 'user', route: '/User' },
      ],
      sideMenus: require('../views/Home/router').menus,
    },
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('../models/app'));
app.model(require('../models/home'));

// 4. Router
app.router(require('../views/Home/router').RouterConfig);

// 5. Start
app.start('#root');
