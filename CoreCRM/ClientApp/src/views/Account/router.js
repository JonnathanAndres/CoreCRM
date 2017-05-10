import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import Login from './Login';

export const routes = (
  <Route>
    <IndexRedirect to="login" />
    <Route path="login" component={Login} />
  </Route>
);

export function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/">
        { routes }
      </Route>
    </Router>
  );
}
