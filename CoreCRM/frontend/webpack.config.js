'use strict';

const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (env) {
  env = env || {};

  let outputPath = env.production ? path.join(__dirname, '..', 'wwwroot') : path.join(__dirname, 'build');

  let devPlugsins = [
    new CopyWebpackPlugin([
      { from: '../node_modules/bootstrap/dist', to: 'lib' },
      { from: '../node_modules/jquery/dist', to: 'lib/js' },
      { from: '../node_modules/font-awesome/css', to: 'lib/css' },
      { from: '../node_modules/font-awesome/fonts', to: 'lib/fonts' },
      { from: '../node_modules/vue/dist', to: 'lib/js' },
    ])
  ];

  return {
    context: path.join(__dirname, "src"),
    entry: {
      orgnization: './orgnization.js',
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
    plugins: env.production ? [] : devPlugsins,
    devServer: {
      contentBase: path.join(__dirname, "build"),
    },
  };
};