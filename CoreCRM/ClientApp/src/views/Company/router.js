import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import Layout from '../Layout';
import Structure from './Structure';
import Employee from './Employee';
import { routesToMenus } from '../../utils';
import menuMetadata from './menu';

export const routes = (
  <Route component={Layout}>
    <IndexRedirect to="structure" />
    <Route path="structure" component={Structure} />
    <Route path="employee" component={Employee} />
  </Route>
);

export const menus = routesToMenus(routes, menuMetadata);

export function RouterConfig({ history }) {
  return (
    <Router history={history}>
      {routes}
    </Router>
  );
}
