const babelRegister = require('babel-register');
const cssModulesRequireHook = require('css-modules-require-hook');
const { match } = require('react-router');
const { createServerRenderer } = require('aspnet-prerendering');

cssModulesRequireHook({
  generateScopedName: '[local]___[hash:base64:5]',
});

module.exports = createServerRenderer((params) => {
  return new Promise((resolve) => {
    const BootServer = require(`./dist/server/Account.js`); // eslint-disable-line
    
    match({
      routes: BootServer.serverSideRoutes,
      location: '/login',
    }, (err, redirectLocation, renderProps) => {
      if (err) throw new Error(`Route match failed: ${err}`);
      if (redirectLocation) throw new Error(`I don't know how to redirect: ${redirectLocation}.`);

      const initialState = params.data || {};
      resolve({ html: BootServer.renderHTML(initialState, renderProps) });
    });
  });
});
