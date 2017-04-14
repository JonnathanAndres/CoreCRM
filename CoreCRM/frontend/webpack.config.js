'use strict';

const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (env) {
  env = env || {};

  let outputPath;
  if (env.production || env.dotnet) {
    outputPath = path.join(__dirname, '..', 'wwwroot', 'js');
  } else {
    outputPath = path.join(__dirname, 'build');
  }

  let plugins;

  if (env.production || env.dotnet) {
    plugins = [];
  } else {
    plugins = [
      new CopyWebpackPlugin([
        { from: '../node_modules/bootstrap/dist', to: 'lib' },
        { from: '../node_modules/jquery/dist', to: 'lib/js' },
        { from: '../node_modules/font-awesome/css', to: 'lib/css' },
        { from: '../node_modules/font-awesome/fonts', to: 'lib/fonts' },
        { from: '../node_modules/vue/dist', to: 'lib/js' },
      ])
    ];
  }


  return {
    context: path.join(__dirname, "src"),
    entry: {
      Profile: './Profile.js',
      Orgnization: './Orgnization.js',
    },
    output: {
      path: outputPath,
      filename: "[name].bundle.js",
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [{
            loader: "babel-loader",
            options: { presets: ["es2015"] }
          }],
        },
        {
          test: /\.vue$/,
          use: [{
            loader: "vue-loader"
          }],
        },
        // Loaders for other file types can go here
      ],
    },
    externals: {
        "jquery": "jQuery",
        "vue": "Vue",
    },
    plugins: plugins,

    devServer: {
      contentBase: path.join(__dirname, "build"),
      setup(app) {
        app.set('views', path.join(__dirname, 'src', 'pages'));
        app.set('view engine', 'ejs');

        app.get('/pages/:page', function(req, res) {
          res.render(req.params.page, {});
        });
      },
    },
  };
};
