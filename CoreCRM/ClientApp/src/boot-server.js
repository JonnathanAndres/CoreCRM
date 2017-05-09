import { match } from 'react-router';
import { createServerRenderer } from 'aspnet-prerendering';

import { BootServer as Home } from '../dist/server/Home';
import { BootServer as Account } from '../dist/server/Account';

const servers = {
  Home,
  Account,
};

export default createServerRenderer((params) => {
  return new Promise((resolve) => {
    const re = /^\/([^/]*)(.*)/;
    const matched = params.location.path.match(re);
    const controller = (matched === null || matched[1] === '') ? 'Home' : matched[1];
    const clientRoute = (matched === null || matched[2] === '') ? '/' : matched[2];

    const BootServer = servers[controller] || Home;

    match({
      routes: BootServer.routes,
      location: clientRoute,
    }, (err, redirectLocation, renderProps) => {
      if (err) throw new Error(`Route match failed: ${err}`);
      if (redirectLocation) throw new Error(`I don't know how to redirect: ${redirectLocation}.`);

      const initialState = params.data || {};
      resolve({ html: BootServer.renderHTML(initialState, renderProps) });
    });
  });
});
