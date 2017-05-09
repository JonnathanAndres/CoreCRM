import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import Layout from '../../components/Layout';
import Structure from './Structure';
import Employee from './Employee';

export const routes = (
  <Route component={Layout}>
    <IndexRedirect to="structure" />
    <Route path="structure" component={Structure} />
    <Route path="employee" component={Employee} />
  </Route>
);

export function RouterConfig({ history }) {
  return (
    <Router history={history}>
      {routes}
    </Router>
  );
}
