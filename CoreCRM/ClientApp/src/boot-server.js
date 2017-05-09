import fs from 'fs';
import path from 'path';
import { match } from 'react-router';
import { createServerRenderer } from 'aspnet-prerendering';

export default createServerRenderer((params) => {
  return new Promise((resolve) => {
    const re = /^([^/]+)(\/?.*)/;
    const matched = params.location.path.match(re);
    const controller = matched[1];
    const clientPath = matched[2];

    const filename = path.resolve(`./dist/server/${controller}.js`);
    const src = fs.readFileSync(filename, 'urf8');
    const Module = module.constructor;
    const m = new Module();
    m._compile(src, null); // eslint-disable-line

    const { BootServer } = m.exports;

    match({
      routes: BootServer.routes,
      location: clientPath,
    }, (err, redirectLocation, renderProps) => {
      if (err) throw new Error(`Route match failed: ${err}`);
      if (redirectLocation) throw new Error(`I don't know how to redirect: ${redirectLocation}.`);

      const initialState = params.data || {};
      resolve({ html: BootServer.renderHTML(initialState, renderProps) });
    });
  });
});
