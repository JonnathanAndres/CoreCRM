import React from 'react';
import { Router, Route } from 'dva/router';
import IndexView from './IndexView';

export const routes = (
  <Route path="/" component={IndexView}>
    { /** More routes here. */ }
  </Route>
);

export function RouterConfig({ history }) {
  return (
    <Router history={history}>
      { routes }
    </Router>
  );
}
