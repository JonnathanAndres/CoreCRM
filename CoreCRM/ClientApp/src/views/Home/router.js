import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import Layout from '../Layout';
import { routesToMenus } from '../../utils';
import Index from './Index';
import menuMetadata from './menu';

export const routes = (
  <Route component={Layout}>
    <IndexRoute component={Index} />
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
