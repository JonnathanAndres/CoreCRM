import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import Layout from '../../components/Layout';
import Index from './Index';

export const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Index} />
  </Route>
);

export function RouterConfig({ history }) {
  return (
    <Router history={history}>
      { routes }
    </Router>
  );
}
