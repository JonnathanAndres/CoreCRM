import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import Layout from '../../components/Layout';
import Index from './Index';
import Profile from './Profile';

export const routes = (
  <Route component={Layout}>
    <IndexRoute component={Index} />
    <Route path="profile" component={Profile} />
  </Route>
);

export function RouterConfig({ history }) {
  return (
    <Router history={history}>
      {routes}
    </Router>
  );
}
