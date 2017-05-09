import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import Layout from '../../components/Layout';
import Index from './Index';
import Add from './Add';
import Edit from './Edit';
import Care from './Care';
import View from './View';
import Pool from './Pool';
import Statistics from './Statistics';

import ContactIndex from './Contact/Index';
import ContactAdd from './Contact/Add';
import ContactEdit from './Contact/Edit';
import ContactView from './Contact/View';

import PotentialIndex from './Potential/Index';
import PotentialAdd from './Potential/Add';
import PotentialEdit from './Potential/Edit';
import PotentialView from './Potential/View';
import PotentialPool from './Potential/Pool';
import PotentialStatistics from './Potential/Statistics';

export const routes = (
  <Route component={Layout}>
    <IndexRoute component={Index} />
    <Route path="add" component={Add} />
    <Route path="edit" component={Edit} />
    <Route path="view" component={View} />
    <Route path="care" component={Care} />
    <Route path="pool" component={Pool} />
    <Route path="statistics" component={Statistics} />
    <Route path="contact">
      <IndexRoute component={ContactIndex} />
      <Route path="add" component={ContactAdd} />
      <Route path="edit" component={ContactEdit} />
      <Route path="view" component={ContactView} />
    </Route>
    <Route path="potential">
      <IndexRoute component={PotentialIndex} />
      <Route path="add" component={PotentialAdd} />
      <Route path="edit" component={PotentialEdit} />
      <Route path="view" component={PotentialView} />
      <Route path="pool" component={PotentialPool} />
      <Route path="statistics" component={PotentialStatistics} />
    </Route>
  </Route>
);

export function RouterConfig({ history }) {
  return (
    <Router history={history}>
      { routes }
    </Router>
  );
}
