import React from 'react';
import { Router, Route } from 'dva/router';
import IndexView from './IndexView';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexView} />
    </Router>
  );
}

export default RouterConfig;
