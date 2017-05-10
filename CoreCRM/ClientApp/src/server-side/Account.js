import React from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';
import { RouterContext, createMemoryHistory } from 'dva/router';
import { renderToString } from 'react-dom/server';

import { routes as _routes } from '../views/Account/router';
import '../views/Shared/Shared.css';

export function renderHTML(initialState, renderProps) {
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
  app.router(({ routerRenderProps }) => {
    return <RouterContext {...routerRenderProps} />;
  });

  return renderToString(app.start()({ routerRenderProps: renderProps }));
}

export const routes = _routes;
