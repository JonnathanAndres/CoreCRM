import dva from 'dva';
import '../views/Shared/Index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('../models/example'));

// 4. Router
app.router(require('../views/Login/router'));

// 5. Start
app.start('#root');

