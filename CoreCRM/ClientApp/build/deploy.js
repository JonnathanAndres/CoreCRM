const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodeExternals = require('webpack-node-externals');

webpack({
  // Configuration Object
  context: path.join(__dirname, '../src'),
  target: 'node',
  entry: {
    'boot-server': './boot-server.js',
  },
  output: {
    path: path.join(__dirname, '..'),
    filename: '[name].js',
    library: 'BootServer',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
            plugins: [
              "transform-runtime",
              ["import", { "libraryName": "antd", "style": "css" }]
            ]
          }
        },
      },
      {
        test: /\.css$/,
        use: {
          loader: 'css-loader',
          options: {
            
          }
        },
      },
    ],
  },
  externals: [NodeExternals()],
  plugins: [
    new CopyWebpackPlugin([
      {
        context: path.join(__dirname, '../dist/client'),
        from: '*.js',
        to: path.join(__dirname, '../../wwwroot/js/[name].[ext]'),
      },
      {
        context: path.join(__dirname, '../dist/client'),
        from: '*.css',
        to: path.join(__dirname, '../../wwwroot/css/[name].[ext]'),
      },
    ], {debug: 'warning'}),
  ],
}, (err, stats) => {
  if (err || stats.hasErrors()) {
    // Handle errors here
    console.log(err); // eslint-disable-line
    console.log(stats.compilation.errors); // eslint-disable-line
  }
  // Done processing
  console.log('Process done.'); // eslint-disable-line
});
