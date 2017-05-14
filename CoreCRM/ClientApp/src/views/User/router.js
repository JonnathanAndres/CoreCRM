import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import Layout from '../Layout';
import Index from './Index';
import Profile from './Profile';
import { routesToMenus } from '../../utils';
import menuMetadata from './menu';

export const routes = (
  <Route component={Layout}>
    <IndexRoute component={Index} />
    <Route path="profile" component={Profile} />
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
