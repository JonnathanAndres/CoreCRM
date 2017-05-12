import React from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';
import { Route, RouterContext, createMemoryHistory } from 'dva/router';
import { renderToString } from 'react-dom/server';
import { routes } from '../views/Account/router';
import '../views/Shared/Shared.css';

export function renderHTML(initialState, serverRenderProps) {
  // 1. Initialize
  const app = dva({
    history: createMemoryHistory(),
    initialState,
  });

  // 2. Plugins
  app.use(createLoading());

  // 3. Model
  app.model(require('../models/account')); // eslint-disable-line

  // 4. Router
  app.router(({ renderProps }) => {
    return <RouterContext {...renderProps} />;
  });

  return renderToString(app.start()({ renderProps: serverRenderProps }));
}

export const serverSideRoutes = <Route path="/">{routes}</Route>;
