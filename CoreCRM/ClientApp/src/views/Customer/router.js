import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import Layout from '../../components/Layout';
import Index from './Index';
import Care from './Care';
import Contact from './Contact';
import Pool from './Pool';
import Statistics from './Statistics';

export const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Index} />
    <Route path="/care" component={Care} />
    <Route path="/contact" component={Contact} />
    <Route path="/pool" component={Pool} />
    <Route path="/statistics" component={Statistics} />
  </Route>
);

export function RouterConfig({ history }) {
  return (
    <Router history={history}>
      { routes }
    </Router>
  );
}
