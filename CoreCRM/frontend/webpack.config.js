'use strict';

const path = require("path");
const webpack = require("webpack");

let outputPath = path.join(__dirname, 'build');

module.exports = {
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
  devServer: {
    contentBase: path.join(__dirname, "build"),
  },
};