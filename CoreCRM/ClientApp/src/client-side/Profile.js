import dva from 'dva';
import { hashHistory } from 'dva/router';

// 1. Initialize
const app = dva({
  history: hashHistory,
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('../models/example'));

// 4. Router
app.router(require('../views/Profile/router'));

// 5. Start
app.start('#root');

