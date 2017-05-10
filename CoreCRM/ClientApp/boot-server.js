const { match } = require('react-router');
const { createServerRenderer } = require('aspnet-prerendering');

module.exports = createServerRenderer((params) => {
  return new Promise((resolve) => {
    const re = /^\/([^/]*)(.*)/;
    const matched = params.location.path.match(re);
    const controller = (matched === null || matched[1] === '') ? 'Home' : matched[1];
    const clientRoute = (matched === null || matched[2] === '') ? '/' : matched[2];

    const BootServer = require(`./dist/server/${controller}.js`); // eslint-disable-line

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
