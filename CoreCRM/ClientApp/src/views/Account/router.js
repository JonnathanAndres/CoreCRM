import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import Layout from '../../components/Layout';
import Login from './Login';

export const routes = (
  <Route path="/" component={Layout}>
    <IndexRedirect to="/login" />
    <Route path="login" component={Login} />
  </Route>
);

export function RouterConfig({ history }) {
  return (
    <Router history={history}>
      { routes }
    </Router>
  );
}
