import 'babel-polyfill';
import Koa from 'koa';
import { match } from 'react-router';

const app = new Koa();

app.use(async (ctx) => {
  const App = require("./dist/server/js/Index") // eslint-disable-line

  match({
    routes: App.routes,
    location: '/',
  }, (err, redirectLocation, renderProps) => {
    if (err) throw new Error(`Route match failed: ${err}`);

    if (redirectLocation) throw new Error('I don\'t know how to redirect.');

    const initialState = {};
    const html = App.renderHTML(initialState, renderProps);

    ctx.body = html; // eslint-disable-line
  });
});

app.listen(3000);
