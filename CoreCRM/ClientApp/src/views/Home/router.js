import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import Layout from '../Layout';
import { routesToMenus } from '../../utils';
import WorkBench from './WorkBench';
import Dashboard from './Dashboard';
import menuMetadata from './menu';

export const routes = (
  <Route component={Layout}>
    <IndexRedirect to="workbench" />
    <Route path="workbench" component={WorkBench} />
    <Route path="dashboard" component={Dashboard} />
  </Route>
);

export const menus = routesToMenus(routes, menuMetadata);

export function RouterConfig({ history }) {
  return (
    <Router history={history}>
      { routes }
    </Router>
  );
}
