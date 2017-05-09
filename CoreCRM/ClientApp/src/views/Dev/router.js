import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import { routes as HomeRoutes } from '../Home/router';
import { routes as AccountRoutes } from '../Account/router';
import { routes as UserRoutes } from '../User/router';
import { routes as CompanyRoutes } from '../Company/router';
import { routes as CustomerRoutes } from '../Customer/router';

export function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/">
        <IndexRedirect to="/Home" />
      </Route>
      <Route path="/Home">
        {HomeRoutes}
      </Route>
      <Route path="/Account">
        {AccountRoutes}
      </Route>
      <Route path="/User">
        {UserRoutes}
      </Route>
      <Route path="/Company">
        {CompanyRoutes}
      </Route>
      <Route path="/Customer">
        {CustomerRoutes}
      </Route>
    </Router>
  );
}
