const babelRegister = require('babel-register');
const cssModulesRequireHook = require('css-modules-require-hook');
const { match } = require('react-router');
const { createServerRenderer } = require('aspnet-prerendering');

cssModulesRequireHook({
  generateScopedName: '[local]___[hash:base64:5]',
});

module.exports = createServerRenderer((params) => {
  return new Promise((resolve) => {
    const BootServer = require(`./dist/server/${params.data.controller}`); // eslint-disable-line

    let clientPath = '/';
    params.data.cookies.forEach((cookie) => {
      if (cookie.key === 'client-path') {
        clientPath = `/${cookie.value}`;
      }
    });

    match({
      routes: BootServer.serverSideRoutes,
      location: clientPath,
    }, (err, redirectLocation, renderProps) => {
      if (err) throw new Error(`Route match failed: ${err}`);
      if (redirectLocation) throw new Error(`I don't know how to redirect to ${redirectLocation}.`);

      const initialState = params.data.initialState || {};
      resolve({
        html: BootServer.renderHTML(initialState, renderProps),
        globals: {
          INITIAL_STATE: initialState,
          REQUEST_VERIFICATION_TOKEN: params.data.requestVerificationToken,
          RETURN_URL: params.data.returnUrl,
        },
      });
    });
  });
});
