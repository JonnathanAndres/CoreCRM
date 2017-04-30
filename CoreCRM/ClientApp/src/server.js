import 'babel-polyfill';
import Koa from 'koa';
import { match } from 'react-router';

var app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = "Hello Koa";

  var App = require("./dist/server/js/Index")

  match({
      routes: App.routes,
      location: '/'
  }, function (err, redirectLocation, renderProps) {
      if (err) throw new Error("Route match failed: " + err);

      if (redirectLocation) new Error("I don't know how to redirect.");

      var initialState = {};
      var html = App.renderHTML(initialState, renderProps);

      ctx.body = html;
  })
});

app.listen(3000);
