var { match } = require('react-router');
var { createServerRenderer } = require('aspnet-prerendering');

module.exports = createServerRenderer(function(params) {
    return new Promise(function (resolve, reject) {
        var re = /^\/([^\/]*)\/?([^\/]*)\??/;
        var matched = params.location.path.match(re);
        var controller = matched[1];
        var action = matched[2] !== '' ? matched[2] : 'Index';
        //var codeFile = './dist/' + controller + action;
        var codeFile = './dist/server/Index';
        var App = require(codeFile);

        match({
            routes: App.routes,
            location: params.location.path
        }, function (err, redirectLocation, renderProps) {
            if (err) throw new Error("Route match failed: " + err);

            if (redirectLocation) new Error("I don't know how to redirect.");

            var initialState = {};
            resolve({ html: App.renderHTML(initialState, renderProps)});
        })
    });
});