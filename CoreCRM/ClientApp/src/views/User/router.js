import React from 'react';
import { Router, Route } from 'dva/router';
import IndexView from './IndexView';
import LoginView from './LoginView';

export const routes = (
  <Route path="/" component={IndexView}>
    <Route path="/Login" component={LoginView} />
  </Route>
);

export function RouterConfig({ history }) {
  return (
    <Router history={history}>
      {routes}
    </Router>
  );
}
