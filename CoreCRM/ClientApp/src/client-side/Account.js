import dva from 'dva';
import createLoading from 'dva-loading';
import { hashHistory } from 'dva/router';
import '../views/Shared/Shared.css';

// 1. Initialize
const app = dva({
  history: hashHistory,
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('../models/account'));

// 4. Router
app.router(require('../views/Account/router').RouterConfig);

// 5. Start
app.start('#root');
